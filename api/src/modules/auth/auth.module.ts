// api/src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
@Module({ providers: [PrismaService, AuthService, AuthResolver] })
export class AuthModule {}
