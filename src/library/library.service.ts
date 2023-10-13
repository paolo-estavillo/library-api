import { Injectable } from '@nestjs/common';
import { AuthorInterface } from '../authors/types/types';
import { BookInterface } from '../books/types/types';
import { BooksService } from '../books/books.service';
import { AuthorsService } from '../authors/authors.service';
import type { AuthorId } from '../authors/types/types';
import type { BookId } from '../books/types/types';
import {
  generatedAuthorToBooksTable,
  generatedBookToAuthorsTable,
} from '../utils/generated-data';

@Injectable()
export class LibraryService {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
  ) {}

  private authorToBooksTable = generatedAuthorToBooksTable;

  private bookToAuthorsTable = generatedBookToAuthorsTable;

  createRelation(authorId: AuthorId, bookId: BookId) {
    if (!this.booksService.hasBook(bookId))
      throw new Error(
        `Attempted to create relation but book ${bookId} does not exist`,
      );

    if (!this.authorsService.hasAuthor(authorId))
      throw new Error(
        `Attempted to create relation but author ${authorId} does not exist`,
      );

    if (!this.authorToBooksTable.has(authorId))
      this.authorToBooksTable.set(authorId, new Set<BookId>());

    if (!this.bookToAuthorsTable.has(bookId))
      this.bookToAuthorsTable.set(bookId, new Set<AuthorId>());

    this.authorToBooksTable.get(authorId).add(bookId);
    this.bookToAuthorsTable.get(bookId).add(authorId);

    return { message: 'relation made', authorId, bookId };
  }

  getBookIdsOfAuthor(authorId: AuthorId) {
    if (!this.authorToBooksTable.has(authorId)) return [];
    return [...this.authorToBooksTable.get(authorId)];
  }

  getAuthorIdsOfBook(bookId: BookId) {
    if (!this.bookToAuthorsTable.has(bookId)) return [];
    return [...this.bookToAuthorsTable.get(bookId)];
  }

  findBooksOfAuthor(authorId: AuthorId) {
    const bookIds = this.getBookIdsOfAuthor(authorId);
    const books: BookInterface[] = [];

    bookIds.forEach((bookId) => {
      try {
        const book = this.booksService.findOne(bookId);
        books.push(book);
      } catch (err) {
        console.log(err);
      }
    });

    return books;
  }

  findAuthorsOfBook(bookId: BookId) {
    const authorIds = this.getAuthorIdsOfBook(bookId);
    const authors: AuthorInterface[] = [];

    authorIds.forEach((authorId) => {
      try {
        const author = this.authorsService.findOne(authorId);
        authors.push(author);
      } catch (err) {
        console.log(err);
      }
    });

    return authors;
  }

  removeRelation(authorId: AuthorId, bookId: BookId) {
    if (!this.authorsService.hasAuthor(authorId))
      throw new Error(`author with id ${authorId} not found`);
    if (!this.booksService.hasBook(bookId))
      throw new Error(`book with id ${bookId} not found`);

    if (!this.authorToBooksTable.has(authorId))
      throw new Error('relation with author does not exist');
    if (!this.bookToAuthorsTable.has(bookId))
      throw new Error(`relation with book does not exist`);

    if (
      !this.authorToBooksTable.get(authorId).has(bookId) ||
      !this.bookToAuthorsTable.get(bookId).has(authorId)
    ) {
      throw new Error(`relationship does not exist`);
    }

    this.authorToBooksTable.get(authorId).delete(bookId);

    if (this.authorToBooksTable.get(authorId).size == 0)
      this.authorToBooksTable.delete(authorId);

    this.bookToAuthorsTable.get(bookId).delete(authorId);

    if (this.bookToAuthorsTable.get(bookId).size == 0)
      this.bookToAuthorsTable.delete(bookId);

    return 'successfully deleted';
  }

  deleteAuthor(authorId: AuthorId) {
    if (!this.authorsService.hasAuthor(authorId))
      throw new Error(`author does not exist`);

    const bookIds = this.getBookIdsOfAuthor(authorId);
    for (const bookId of bookIds) {
      if (!this.bookToAuthorsTable.has(bookId)) continue;

      this.bookToAuthorsTable.get(bookId).delete(authorId);
      if (this.bookToAuthorsTable.get(bookId).size == 0)
        this.bookToAuthorsTable.delete(bookId);
    }
    this.authorToBooksTable.delete(authorId);

    if (this.authorsService.hasAuthor(authorId))
      this.authorsService.remove(authorId);

    return `author with id ${authorId} deleted`;
  }

  deleteBook(bookId: BookId) {
    if (!this.booksService.hasBook(bookId))
      throw new Error(`book does not exist`);

    const authorIds = this.getAuthorIdsOfBook(bookId);
    for (const authorId of authorIds) {
      if (!this.authorToBooksTable.has(authorId)) continue;

      this.authorToBooksTable.get(authorId).delete(bookId);
      if (this.authorToBooksTable.get(authorId).size == 0)
        this.authorToBooksTable.delete(authorId);
    }
    this.bookToAuthorsTable.delete(bookId);

    if (this.booksService.hasBook(bookId)) this.booksService.remove(bookId);

    return `book with id ${bookId} deleted`;
  }
}
