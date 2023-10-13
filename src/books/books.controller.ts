import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('library/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createBookDto: CreateBookDto,
  ) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    try {
      return this.booksService.findAll();
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.booksService.findOne(+id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateBookDto: UpdateBookDto,
  ) {
    try {
      return this.booksService.update(+id, updateBookDto);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
