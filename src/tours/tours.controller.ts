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
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { QueryToursDto } from './dto/query-tours.dto';
import { UploadService } from 'src/upload/upload.service';
import { FilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

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

  @Get('user/:id')
  findToursByUser(@Param('id') id: string) {
    return this.toursService.findToursByUser(id);
  }
  @Get('bookings/:id')
  findBookingsByTour(@Param('id') id: string) {
    return this.toursService.findBookingsById(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(id, updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.delete(id);
  }
}
