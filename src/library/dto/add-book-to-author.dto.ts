import { IsDefined, IsInt } from 'class-validator';

export class AddBookToAuthorDto {
  @IsDefined()
  @IsInt()
  bookId: number;
}
