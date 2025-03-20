import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', type: String })
  username: string;

  @ApiProperty({ example: 'john@example.com', type: String })
  email: string;

  @ApiProperty({ example: 'securepassword123', type: String })
  password: string;

  @ApiProperty({ example: 'USER', enum: UserRole })
  role: UserRole;
}
