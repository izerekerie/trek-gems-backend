import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    return await this.prisma.booking.create({
      data: createBookingDto,
    });
  }

  async findAll() {
    return await this.prisma.booking.findMany({
      include: {
        user: { select: { id: true, username: true, email: true } },
        tour: true,
        payment: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.booking.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, username: true, email: true } },
        tour: true,
        payment: true,
      },
    });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    return await this.prisma.booking.update({
      where: { id },
      data: updateBookingDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.booking.delete({
      where: { id },
    });
  }
  async getBookingsByTourOwner(ownerId: string) {
    return await this.prisma.booking.findMany({
      where: {
        tour: {
          userId: ownerId, // Fetch bookings for tours owned by this user
        },
      },
      include: {
        user: { select: { id: true, username: true, email: true } }, // Include user details who made the booking
        tour: {
          select: { id: true, title: true, location: true, description: true },
        }, // Include tour details
      },
    });
  }
  async getBookingsByUser(userId: string) {
    return await this.prisma.booking.findMany({
      where: { userId },
      include: {
        tour: true, // Include tour details
      },
    });
  }
}
