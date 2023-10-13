import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { AddBookToAuthorDto } from './dto/add-book-to-author.dto';
import { DelBookFromAuthorDto } from './dto/del-book-from-author.dto';
import { AddAuthorToBookDto } from './dto/add-author-to-book.dto';
import { DelAuthorFromBookDto } from './dto/del-author-from-book.dto';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get('authors/:id/books')
  findBooksOfAuthor(@Param('id') id: string) {
    try {
      return this.libraryService.findBooksOfAuthor(+id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  @Post('authors/:id/books')
  addBookToAuthor(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    addBookToAuthorDto: AddBookToAuthorDto,
  ) {
    try {
      const authorId = +id;
      const bookId = addBookToAuthorDto.bookId;
      return this.libraryService.createRelation(authorId, bookId);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Delete('authors/:id/books')
  removeBookFromAuthor(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    deleteBookFromAuthorDto: DelBookFromAuthorDto,
  ) {
    try {
      const authorId = +id;
      const bookId = deleteBookFromAuthorDto.bookId;
      return this.libraryService.removeRelation(authorId, bookId);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Get('books/:id/authors')
  findAuthorsOfBook(@Param('id') id: string) {
    try {
      return this.libraryService.findAuthorsOfBook(+id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Post('books/:id/authors')
  addAuthorToBook(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    addAuthorToBookDto: AddAuthorToBookDto,
  ) {
    try {
      const bookId = +id;
      const authorId = addAuthorToBookDto.authorId;
      return this.libraryService.createRelation(authorId, bookId);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Delete('books/:id/authors')
  removeAuthorFromBook(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    deleteAuthorFromBookDto: DelAuthorFromBookDto,
  ) {
    try {
      const bookId = +id;
      const authorId = deleteAuthorFromBookDto.authorId;
      return this.libraryService.removeRelation(authorId, bookId);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Delete('authors/:id')
  removeAuthor(@Param('id') id: string) {
    try {
      return this.libraryService.deleteAuthor(+id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Delete('book/:id')
  removeBook(@Param('id') id: string) {
    try {
      return this.libraryService.deleteBook(+id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
