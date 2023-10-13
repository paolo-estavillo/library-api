import { IsDefined, IsInt } from 'class-validator';

export class DelAuthorFromBookDto {
  @IsDefined()
  @IsInt()
  authorId: number;
}
