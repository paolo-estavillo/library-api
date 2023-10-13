import { IsDefined, IsInt } from 'class-validator';

export class AddAuthorToBookDto {
  @IsDefined()
  @IsInt()
  authorId: number;
}
