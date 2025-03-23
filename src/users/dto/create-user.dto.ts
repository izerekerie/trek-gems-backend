import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', type: String })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john@example.com', type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'securepassword123', type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'USER', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
  @ApiProperty()
  refreshToken: string;
}
