import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  async validateToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!(await bcrypt.compare(token, user.refreshToken))) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const tokens = await this.createTokens(
      user.id,
      user.email,
      user.username,
      user.role,
    );

    return { user, tokens };
  }

  async refreshTokens(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    const tokens = await this.createTokens(
      user.id,
      user.email,
      user.username,
      user.role,
    );

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: await bcrypt.hash(tokens.refresh_token, 10) },
    });
    return tokens;
  }

  async createTokens(
    userId: string,
    email: string,
    username: string,
    role: UserRole,
  ) {
    const payload = { sub: userId, email, username, role };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '1h', // Short expiry time for security
    });

    // Generate refresh token (longer-lived)
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // Refresh token lasts longer
    });

    const hashedToken = await bcrypt.hash(refresh_token, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedToken }, // Hash for security
    });

    return { access_token, refresh_token };
  }
}
