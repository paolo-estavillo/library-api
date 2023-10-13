import { Injectable, Scope } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { generateBooks, generatedBooks } from '../utils/generated-data';
import { BookInterface, Books } from './types/types';

type BookId = BookInterface['id'];

@Injectable({ scope: Scope.DEFAULT })
export class BooksService {
  private booksTable: Books = generatedBooks;
  // private booksTable: Books = generateBooks();

  hasBook(id: number) {
    return this.booksTable.has(id);
  }

  create(createBookDto: CreateBookDto) {
    const newId = Date.now(); // Generate an ID
    const newBook: BookInterface = {
      id: newId,
      ...createBookDto,
    };

    this.booksTable.set(newId, newBook);

    return newBook;
  }

  findAll() {
    return [...this.booksTable.values()];
  }

  findOne(id: number) {
    if (!this.hasBook(id)) {
      throw new Error(`book with id ${id} not found`);
    }

    return this.booksTable.get(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    if (!this.hasBook(id)) {
      throw new Error(`book with id ${id} not found`);
    }

    const oldBook = this.booksTable.get(id);
    this.booksTable.set(id, { ...oldBook, ...updateBookDto });

    return this.booksTable.get(id);
  }

  remove(id: number) {
    if (!this.hasBook(id)) {
      throw new Error(`book with id ${id} not found`);
    }

    const bookToBeRemoved = structuredClone(this.booksTable.get(id));
    this.booksTable.delete(id);

    return bookToBeRemoved;
  }

  hasBooks(bookIds: BookId[]) {
    for (const bookId of bookIds) {
      if (!this.hasBook(bookId)) return false;
    }

    return true;
  }
}
