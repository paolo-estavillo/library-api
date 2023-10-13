import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthorsService } from '../authors/authors.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, AuthorsService],
  exports: [BooksService],
})
export class BooksModule {}
