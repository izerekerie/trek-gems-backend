import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ToursService } from './tours.service';

@Module({
  controllers: [ToursController],
  providers: [ToursService, PrismaService],
})
export class ToursModule {}
