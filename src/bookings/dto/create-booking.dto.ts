import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';
import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ type: String, example: 'user-1234-uuid' })
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({ type: String, example: 'tour-5678-uuid' })
  @IsString()
  @IsUUID()
  tourId: string;

  @ApiProperty({
    type: Number,
    description: 'Number of people booking the tour',
    example: 2,
    minimum: 1,
    maximum: 10,
  })
  @IsPositive()
  @Min(1)
  @Max(10)
  numberOfPeople: number;

  @ApiProperty({ enum: BookingStatus, example: BookingStatus.PENDING })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus = BookingStatus.PENDING;

  @ApiProperty({ type: String, example: '2025-04-01T12:00:00.000Z' })
  @IsISO8601()
  date: string;

  @ApiProperty({
    type: Number,
    description: 'Total booking cost',
    example: 500.0,
  })
  @IsPositive()
  totalCost: number;
}
