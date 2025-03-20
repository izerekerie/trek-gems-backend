import { ApiProperty } from '@nestjs/swagger';
import { NotificationStatus, NotificationType } from '@prisma/client';

export class CreateNotificationDto {
  @ApiProperty({ type: String, example: 'user-1234-uuid' })
  userId: string;

  @ApiProperty({ type: String, example: 'Your booking has been confirmed' })
  message: string;

  @ApiProperty({
    enum: NotificationType,
    example: NotificationType.BOOKING_CONFIRMATION,
  })
  type: NotificationType;

  @ApiProperty({ enum: NotificationStatus, example: NotificationStatus.UNREAD })
  status?: NotificationStatus;
}
