import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: createReviewDto,
    });
  }

  async findAll() {
    return this.prisma.review.findMany({
      include: {
        user: { select: { username: true, email: true } },
        tour: { select: { title: true, location: true } },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        user: { select: { username: true, email: true } },
        tour: { select: { title: true, location: true } },
      },
    });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  async remove(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
