export interface BookInterface {
  id: number;
  title: string;
  isbn: [string, ...string[]];
  year: number;
  publisher: string;
  description?: string;
  subjects?: [string, ...string[]];
}

export type BookId = BookInterface['id'];

export type Books = Map<BookId, BookInterface>;
