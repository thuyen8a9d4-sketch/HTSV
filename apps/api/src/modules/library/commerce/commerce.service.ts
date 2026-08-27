import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicPrismaService } from '../../../academic-prisma/academic-prisma.service';
import {
  AccessGrantSource,
  OrderStatus,
  PaymentStatus,
  TaiLieuStatus,
} from '../../../generated/academic-client';

@Injectable()
export class CommerceService {
  constructor(private readonly prisma: AcademicPrismaService) {}

  async buy(userId: number, materialId: number) {
    const material = await this.prisma.taiLieu.findUnique({ where: { id: materialId } });
    if (
      !material ||
      material.status !== TaiLieuStatus.PUBLISHED ||
      !material.isSellable ||
      material.price === null
    ) {
      throw new NotFoundException('Tài liệu không tồn tại hoặc không thể mua');
    }

    const alreadyOwned = await this.prisma.quyenTruyCapTaiLieu.findUnique({
      where: { userId_materialId: { userId, materialId } },
    });
    if (alreadyOwned) {
      throw new BadRequestException('Bạn đã sở hữu tài liệu này');
    }

    const order = await this.prisma.donHang.create({
      data: {
        userId,
        status: OrderStatus.PAID,
        totalAmount: material.price,
        paidAt: new Date(),
      },
    });

    await this.prisma.thanhToan.create({
      data: {
        orderId: order.id,
        amount: material.price,
        provider: 'DEMO',
        status: PaymentStatus.SUCCESS,
        confirmedAt: new Date(),
      },
    });

    return this.prisma.quyenTruyCapTaiLieu.create({
      data: {
        userId,
        materialId,
        grantedVia: AccessGrantSource.PURCHASE,
        orderId: order.id,
      },
    });
  }

  findMyOrders(userId: number) {
    return this.prisma.donHang.findMany({
      where: { userId },
      include: { thanhToans: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRevenueSummary() {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [totalRevenue, monthlyRevenue, paidOrderCount, totalOrderCount] = await Promise.all([
      this.prisma.donHang.aggregate({
        where: { status: OrderStatus.PAID },
        _sum: { totalAmount: true },
      }),
      this.prisma.donHang.aggregate({
        where: { status: OrderStatus.PAID, paidAt: { gte: startOfMonth } },
        _sum: { totalAmount: true },
      }),
      this.prisma.donHang.count({ where: { status: OrderStatus.PAID } }),
      this.prisma.donHang.count(),
    ]);

    return {
      totalRevenue: totalRevenue._sum.totalAmount ?? 0,
      monthlyRevenue: monthlyRevenue._sum.totalAmount ?? 0,
      paidOrderCount,
      totalOrderCount,
    };
  }

  findAllOrdersAdmin() {
    return this.prisma.donHang.findMany({
      include: { thanhToans: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
