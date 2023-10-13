import { IsDefined, IsInt } from 'class-validator';

export class DelBookFromAuthorDto {
  @IsDefined()
  @IsInt()
  bookId: number;
}
