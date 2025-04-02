import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),

      api_key: configService.get<string>('CLOUDINARY_API_KEY'),

      api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const imageUrls: string[] = [];

    for (const file of files) {
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException(
          `File ${file.originalname} is not an image`,
        );
      }

      try {
        // Upload file to Cloudinary using buffer
        const result: UploadApiResponse = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
          { resource_type: 'image' },
        );

        imageUrls.push(result.secure_url);
      } catch (error) {
        throw new BadRequestException(`Error uploading file: ${error.message}`);
      }
    }

    return imageUrls;
  }
}
