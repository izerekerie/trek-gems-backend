import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async findReviewsByUser(@Param('userId') userId: string) {
    return this.reviewService.findAllByUser(userId);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('tour/:tourOwnerId')
  async findReviewByTou(@Param('tourOwnerId') tourOwnerId: string) {
    return this.reviewService.findAllByTour(tourOwnerId);
  }
  @Get(':id')
  @ApiParam({ name: 'id', type: String, example: 'review-1234-uuid' })
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiParam({ name: 'id', type: String, example: 'review-1234-uuid' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', type: String, example: 'review-1234-uuid' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
