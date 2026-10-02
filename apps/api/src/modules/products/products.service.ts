import { Injectable, NotFoundException } from '@nestjs/common';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: CorePrismaService) {}

  // 1. Lấy danh sách sản phẩm
  async findAll() {
    return (this.prisma as any).product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // 2. Lấy chi tiết 1 sản phẩm
  async findOne(id: string) {
    const product = await (this.prisma as any).product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID: ${id}`);
    }
    return product;
  }

  // 3. Thêm mới sản phẩm (Nhận trực tiếp object)
  async create(data: { name: string; price: number; description?: string }) {
    return (this.prisma as any).product.create({
      data,
    });
  }

  // 4. Cập nhật sản phẩm
  async update(id: string, data: any) {
    await this.findOne(id);
    return (this.prisma as any).product.update({
      where: { id },
      data,
    });
  }

  // 5. Xóa sản phẩm
  async remove(id: string) {
    await this.findOne(id);
    return (this.prisma as any).product.delete({
      where: { id },
    });
  }
}
