import { IsNotEmpty, Length } from 'class-validator';

export class CreateAuthorDto {
  @Length(10, 20)
  authorName: string;

  @IsNotEmpty()
  affiliation: string;
}
