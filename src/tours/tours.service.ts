import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.tour.findMany({
      include: {
        User: { select: { username: true, email: true } },
        bookings: true,
        reviews: true,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.tour.findUnique({
      where: { id },
      include: {
        User: { select: { username: true, email: true } },
        bookings: true,
        reviews: true,
      },
    });
  }

  async create(data: CreateTourDto) {
    return await this.prisma.tour.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        price: data.price,
        images: data.images,
        userId: data.userId,
      },
    });
  }

  async update(id: string, data: UpdateTourDto) {
    return await this.prisma.tour.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.tour.delete({ where: { id } });
  }
}
