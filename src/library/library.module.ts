import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { AuthorsModule } from '../authors/authors.module';
import { BooksModule } from '../books/books.module';
import { AuthorsService } from '../authors/authors.service';
import { BooksService } from '../books/books.service';

@Module({
  imports: [AuthorsModule, BooksModule],
  controllers: [LibraryController],
  providers: [LibraryService, AuthorsService, BooksService],
})
export class LibraryModule {}
