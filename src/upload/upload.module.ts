// upload/upload.module.ts
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './upload.controller';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController], // Use controllers instead of providing them
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
