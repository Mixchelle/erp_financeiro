import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  list(companyId: string) { return this.prisma.product.findMany({ where: { companyId } }); }
  create(companyId: string, data: any) { return this.prisma.product.create({ data: { ...data, companyId } }); }
  update(companyId: string, id: string, data: any) { return this.prisma.product.update({ where: { id }, data: { ...data, companyId } }); }
  remove(companyId: string, id: string) { return this.prisma.product.delete({ where: { id } }); }
}
