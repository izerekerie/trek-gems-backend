import { ApiProperty } from '@nestjs/swagger';

export class CreateTourDto {
  @ApiProperty({ type: String, example: 'Discover Rwanda’s Hidden Waterfalls' })
  title: string;

  @ApiProperty({
    type: String,
    example:
      'A breathtaking adventure to explore hidden waterfalls in rural Rwanda.',
  })
  description: string;

  @ApiProperty({ type: String, example: 'Musanze, Rwanda' })
  location: string;

  @ApiProperty({ type: Number, example: 1500.0 })
  price: number;

  @ApiProperty({
    type: [String],
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  images: string[];

  @ApiProperty({ type: String, example: 'user-1234-uuid' })
  userId: string;
}
