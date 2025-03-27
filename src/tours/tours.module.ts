import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ToursService } from './tours.service';
import { UploadService } from 'src/upload/upload.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ToursController],
  providers: [ToursService, PrismaService, UploadService],
})
export class ToursModule {}
