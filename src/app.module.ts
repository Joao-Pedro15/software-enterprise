import { Module } from '@nestjs/common';
import { PrismaService } from '@src/persistence/prisma/prisma.service';
import { ContentController } from './http/rest/controller/content.controller';
import { ContentManagementService } from './core/service/content-management.service';
import { MidiaPlayerService } from './core/service/midia-player.service';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [PrismaService, ContentManagementService, MidiaPlayerService],
})
export class AppModule { }
