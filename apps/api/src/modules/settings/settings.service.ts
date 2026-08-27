import { Injectable } from '@nestjs/common';
import { AcademicPrismaService } from '../../academic-prisma/academic-prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: AcademicPrismaService) {}

  async getSettings() {
    const existing = await this.prisma.caiDatHeThong.findFirst({ orderBy: { id: 'asc' } });
    if (existing) return existing;
    return this.prisma.caiDatHeThong.create({ data: {} });
  }

  async setMonetizationEnabled(monetizationEnabled: boolean) {
    const settings = await this.getSettings();
    return this.prisma.caiDatHeThong.update({
      where: { id: settings.id },
      data: { monetizationEnabled },
    });
  }

  async isMonetizationEnabled(): Promise<boolean> {
    const settings = await this.getSettings();
    return settings.monetizationEnabled;
  }
}
