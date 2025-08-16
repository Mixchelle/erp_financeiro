import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  list(companyId: string) { return this.prisma.customer.findMany({ where: { companyId } }); }
  create(companyId: string, data: any) { return this.prisma.customer.create({ data: { ...data, companyId } }); }
  update(companyId: string, id: string, data: any) { return this.prisma.customer.update({ where: { id }, data: { ...data, companyId } }); }
  remove(companyId: string, id: string) { return this.prisma.customer.delete({ where: { id } }); }
}
