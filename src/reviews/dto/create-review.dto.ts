import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ type: String, example: 'user-1234-uuid' })
  userId: string;

  @ApiProperty({ type: String, example: 'tour-5678-uuid' })
  tourId: string;

  @ApiProperty({ type: Number, example: 5, description: 'Rating from 1 to 5' })
  rating: number;

  @ApiProperty({
    type: String,
    example: 'Amazing experience!',
    required: false,
  })
  comment?: string;
}
