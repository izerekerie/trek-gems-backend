import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { QueryToursDto } from './dto/query-tours.dto';
import { UploadService } from 'src/upload/upload.service';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images', 5))
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Get('search')
  search(@Query('q') query?: string) {
    return this.toursService.searchTours(query);
  }

  @Get()
  findAll(@Query() queryDto: QueryToursDto) {
    return this.toursService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findById(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  findToursByUser(@Param('id') id: string) {
    return this.toursService.findToursByUser(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('bookings/:id')
  findBookingsByTour(@Param('id') id: string) {
    return this.toursService.findBookingsById(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(id, updateTourDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.delete(id);
  }
}
