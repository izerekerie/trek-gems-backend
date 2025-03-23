import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login-dto';
import { Response, Request } from 'express';

// Extend the Request interface to include the user property
declare module 'express' {
  export interface Request {
    user?: { id: string; [key: string]: any };
  }
}
import { RefreshTokenGuard } from './refreshToken.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/register')
  async create(@Body() createAuthDto: CreateUserDto) {
    return await this.userService.create(createAuthDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return res.json({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth('refresh-token')
  @Post('/refresh')
  async refresh(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
  ) {
    const user = req?.user;
    console.log('user', user);
    return this.authService.refreshTokens(req?.user.id);
  }
}
