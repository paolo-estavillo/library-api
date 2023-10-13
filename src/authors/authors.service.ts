import { Injectable, Scope } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import type { AuthorInterface, Authors } from './types/types';
import { generateAuthors, generatedAuthors } from '../utils/generated-data';

type AuthorId = AuthorInterface['id'];

@Injectable({ scope: Scope.DEFAULT })
export class AuthorsService {
  private authorsTable: Authors = generatedAuthors;
  // private authorsTable: Authors = generateAuthors();

  hasAuthor(id: number) {
    return this.authorsTable.has(id);
  }

  create(createAuthorDto: CreateAuthorDto): AuthorInterface {
    const newId = Date.now();
    const newAuthor: AuthorInterface = {
      id: newId,
      ...createAuthorDto,
    };

    this.authorsTable.set(newId, newAuthor);

    return newAuthor;
  }

  findAll() {
    return [...this.authorsTable.values()];
  }

  findOne(id: number) {
    if (!this.hasAuthor(id)) {
      throw new Error(`author with id ${id} not found`);
    }

    return this.authorsTable.get(id);
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    if (!this.hasAuthor(id)) {
      throw new Error(`author with id ${id} not found`);
    }

    const oldAuthor = this.authorsTable.get(id);
    this.authorsTable.set(id, { ...oldAuthor, ...updateAuthorDto });

    return this.authorsTable.get(id);
  }

  remove(id: number) {
    if (!this.hasAuthor(id)) {
      throw new Error(`author with id ${id} not found`);
    }

    const authorToBeRemoved = structuredClone(this.authorsTable[id]);
    this.authorsTable.delete(id);

    return authorToBeRemoved;
  }

  hasAuthors(authorIds: AuthorId[]) {
    console.log(this.authorsTable);
    for (const authorId of authorIds) {
      if (!this.hasAuthor(authorId)) return false;
    }

    return true;
  }
}
