import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role as UserRole,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
