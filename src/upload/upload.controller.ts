import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { BadRequestException } from '@nestjs/common';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('images')
  @UseInterceptors(FilesInterceptor('images', 10)) // 10 is the maximum number of images allowed
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    // for (const file of files) {
    const imageUrls = await this.uploadService.uploadImages(files);
    //   imageUrls.push(imageUrl);
    // }

    return {
      success: true,
      imageUrls,
    };
  }
}
