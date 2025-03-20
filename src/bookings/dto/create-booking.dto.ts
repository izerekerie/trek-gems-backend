import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';

export class CreateBookingDto {
  @ApiProperty({ type: String, example: 'user-1234-uuid' })
  userId: string;

  @ApiProperty({ type: String, example: 'tour-5678-uuid' })
  tourId: string;

  @ApiProperty({ enum: BookingStatus, example: BookingStatus.PENDING })
  status?: BookingStatus;
}
