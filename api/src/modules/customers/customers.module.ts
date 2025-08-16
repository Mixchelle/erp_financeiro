import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
@Module({ providers: [PrismaService, CustomersService, CustomersResolver] })
export class CustomersModule {}
