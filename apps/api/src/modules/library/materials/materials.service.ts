import { randomUUID } from 'crypto';
import { extname } from 'path';
import { writeFileSync } from 'fs';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicPrismaService } from '../../../academic-prisma/academic-prisma.service';
import { TaiLieuStatus } from '../../../generated/academic-client';
import { SettingsService } from '../../settings/settings.service';
import { UsersService } from '../../users/users.service';
import { ensureUploadsDir, materialFilePath } from '../storage.util';
import { CreateMaterialDto } from './dto/create-material.dto';
import { RejectMaterialDto } from './dto/reject-material.dto';
import { SearchMaterialsDto } from './dto/search-materials.dto';

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.zip', '.rar'];
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

@Injectable()
export class MaterialsService {
  constructor(
    private readonly prisma: AcademicPrismaService,
    private readonly usersService: UsersService,
    private readonly settingsService: SettingsService,
  ) {}

  async search(filters: SearchMaterialsDto) {
    const materials = await this.prisma.taiLieu.findMany({
      where: {
        status: TaiLieuStatus.PUBLISHED,
        subjectId: filters.subjectId,
        type: filters.type as any,
        title: filters.q ? { contains: filters.q, mode: 'insensitive' } : undefined,
      },
      include: { subject: true },
      orderBy: { createdAt: 'desc' },
    });
    return this.usersService.attachOwners(materials);
  }

  async findMyUploads(ownerUserId: number) {
    return this.prisma.taiLieu.findMany({
      where: { ownerUserId },
      include: { subject: true, phienBanTaiLieus: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllAdmin() {
    const materials = await this.prisma.taiLieu.findMany({
      include: { subject: true },
      orderBy: { createdAt: 'desc' },
    });
    return this.usersService.attachOwners(materials);
  }

  async findOne(id: number, currentUserId: number | null) {
    const material = await this.prisma.taiLieu.findUnique({
      where: { id },
      include: { subject: true, phienBanTaiLieus: true },
    });
    if (!material) throw new NotFoundException('Không tìm thấy tài liệu');
    if (material.status !== TaiLieuStatus.PUBLISHED && material.ownerUserId !== currentUserId) {
      throw new NotFoundException('Không tìm thấy tài liệu');
    }
    const hasAccess = await this.checkAccess(material, currentUserId);
    const [owner] = await this.usersService.findManyByIds([material.ownerUserId]);
    return { ...material, owner: owner ?? null, hasAccess };
  }

  async checkAccess(material: { id: number; isFree: boolean; ownerUserId: number }, userId: number | null) {
    if (material.isFree) return true;
    if (!(await this.settingsService.isMonetizationEnabled())) return true;
    if (userId && material.ownerUserId === userId) return true;
    if (!userId) return false;
    const grant = await this.prisma.quyenTruyCapTaiLieu.findUnique({
      where: { userId_materialId: { userId, materialId: material.id } },
    });
    if (!grant) return false;
    if (grant.expiresAt && grant.expiresAt < new Date()) return false;
    return true;
  }

  async upload(ownerUserId: number, dto: CreateMaterialDto, file: Express.Multer.File) {
    const ext = extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      throw new ForbiddenException(
        `Định dạng file không được hỗ trợ. Chỉ chấp nhận: ${ALLOWED_EXTENSIONS.join(', ')}`,
      );
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new ForbiddenException('File vượt quá dung lượng cho phép (20 MB)');
    }

    ensureUploadsDir();
    const fileName = `${randomUUID()}${ext}`;
    writeFileSync(materialFilePath(fileName), file.buffer);

    const material = await this.prisma.taiLieu.create({
      data: {
        ownerUserId,
        subjectId: dto.subjectId,
        type: dto.type,
        title: dto.title,
        description: dto.description,
        isFree: dto.isFree ?? false,
        isSellable: dto.isSellable ?? false,
        price: dto.price,
        status: TaiLieuStatus.PENDING,
      },
    });

    await this.prisma.phienBanTaiLieu.create({
      data: {
        materialId: material.id,
        versionNo: 1,
        filePath: fileName,
        fileSize: file.size,
        mimeType: file.mimetype,
      },
    });

    return material;
  }

  async publish(id: number) {
    await this.getOrThrow(id);
    return this.prisma.taiLieu.update({ where: { id }, data: { status: TaiLieuStatus.PUBLISHED } });
  }

  async reject(id: number, _dto: RejectMaterialDto) {
    await this.getOrThrow(id);
    return this.prisma.taiLieu.update({ where: { id }, data: { status: TaiLieuStatus.REJECTED } });
  }

  private async getOrThrow(id: number) {
    const material = await this.prisma.taiLieu.findUnique({ where: { id } });
    if (!material) throw new NotFoundException('Không tìm thấy tài liệu');
    return material;
  }

  findAllSubjects() {
    return this.prisma.monHoc.findMany({ orderBy: { name: 'asc' } });
  }

  async getFileForDownload(id: number, currentUserId: number | null) {
    const material = await this.prisma.taiLieu.findUnique({
      where: { id },
      include: { phienBanTaiLieus: { orderBy: { versionNo: 'desc' }, take: 1 } },
    });
    if (!material) throw new NotFoundException('Không tìm thấy tài liệu');
    const hasAccess = await this.checkAccess(material, currentUserId);
    if (!hasAccess) {
      throw new ForbiddenException('Bạn chưa có quyền truy cập tài liệu này');
    }
    const latestVersion = material.phienBanTaiLieus[0];
    if (!latestVersion) throw new NotFoundException('Tài liệu chưa có file');
    return { filePath: materialFilePath(latestVersion.filePath), mimeType: latestVersion.mimeType };
  }
}
