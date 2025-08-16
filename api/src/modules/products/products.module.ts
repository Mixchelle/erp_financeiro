import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
@Module({ providers: [PrismaService, ProductsService, ProductsResolver] })
export class ProductsModule {}
