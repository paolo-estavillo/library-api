import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { BooksService } from '../books/books.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, BooksService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
