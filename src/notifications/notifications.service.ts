import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: createNotificationDto,
    });
  }

  async findAll() {
    return this.prisma.notification.findMany({
      include: {
        user: { select: { username: true, email: true } },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.notification.findUnique({
      where: { id },
      include: {
        user: { select: { username: true, email: true } },
      },
    });
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
  }

  async remove(id: string) {
    return this.prisma.notification.delete({
      where: { id },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { status: NotificationStatus.READ },
    });
  }
}
