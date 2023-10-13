import { IsISBN, IsInt, IsOptional, IsString } from 'class-validator';
import type { BookInterface } from '../types/types';

export class CreateBookDto {
  @IsString()
  title: BookInterface['title'];

  @IsISBN('10', { each: true })
  @IsISBN('13', { each: true })
  isbn: BookInterface['isbn'];

  @IsInt()
  year: BookInterface['year'];

  @IsString()
  publisher: BookInterface['publisher'];

  @IsOptional()
  @IsString()
  description?: BookInterface['description'];

  @IsOptional()
  @IsString({ each: true })
  subjects?: BookInterface['subjects'];
}
