export interface AuthorInterface {
  id: number;
  authorName: string;
  affiliation: string;
}

export type AuthorId = AuthorInterface['id'];

export type Authors = Map<AuthorId, AuthorInterface>;
