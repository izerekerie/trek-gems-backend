import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { QueryToursDto } from './dto/query-tours.dto';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ToursService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async findAll(queryDto: QueryToursDto) {
    const {
      search,
      location,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = queryDto;
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }
    // Handle price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }
    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };
    const total = await this.prisma.tour.count({ where });
    const tours = await this.prisma.tour.findMany({
      where,
      orderBy,
      take: limit,
      skip,
      include: {
        User: { select: { id: true, username: true } },
        _count: { select: { bookings: true, reviews: true } },
      },
    });

    const toursWithRating = await Promise.all(
      tours.map(async (tour) => {
        const reviews = await this.prisma.review.findMany({
          where: { tourId: tour.id },
          select: { rating: true },
        });

        const avgRating = reviews.length
          ? reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
          : 0;

        return {
          ...tour,
          avgRating,
        };
      }),
    );

    return {
      data: toursWithRating,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const tour = await this.prisma.tour.findUnique({
      where: { id },
      include: {
        User: { select: { username: true, email: true } },
        reviews: {
          include: { user: { select: { username: true, id: true } } },
        },
        _count: { select: { bookings: true, reviews: true } },
      },
    });
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }
    const avgRating = tour.reviews.length
      ? tour.reviews.reduce((sum, review) => sum + review.rating, 0) /
        tour.reviews.length
      : 0;

    return { ...tour, avgRating };
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
      include: { User: { select: { username: true, id: true } } },
    });
  }

  async delete(id: string) {
    return await this.prisma.tour.delete({ where: { id } });
  }
  async findToursByUser(userId: string) {
    return await this.prisma.tour.findMany({
      where: { userId },
      include: {
        bookings: false,
        reviews: false,
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
    });
  }
  async findBookingsById(tourId: string) {
    return await this.prisma.booking.findMany({
      where: { tourId },
      include: {
        user: { select: { id: true, username: true, email: true } },
        tour: { select: { id: true, title: true, location: true } },
      },
    });
  }
  async searchTours(query: string) {
    return this.prisma.tour.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { location: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        User: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
      take: 10, // Limit quick search results
    });
  }
}
