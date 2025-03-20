import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty({ type: String, example: 'user-1234-uuid' })
  userId: string;

  @ApiProperty({ type: String, example: 'booking-5678-uuid' })
  bookingId: string;

  @ApiProperty({ type: Number, example: 199.99 })
  amount: number;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PENDING })
  status?: PaymentStatus;
}
