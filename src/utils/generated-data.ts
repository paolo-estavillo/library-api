import type {
  Authors,
  AuthorId,
  AuthorInterface,
} from '../authors/types/types';
import type { Books, BookId, BookInterface } from '../books/types/types';

export const generatedAuthors: Authors = new Map<AuthorId, AuthorInterface>([
  [
    0,
    {
      id: 0,
      authorName: 'Peter Boghossian',
      affiliation:
        'Portland State University, Philosophy Department, Faculty Member',
    },
  ],
  [
    1,
    {
      id: 1,
      authorName: 'James Lindsay',
      affiliation: 'Consultant at New Discourses',
    },
  ],
  [
    2,
    {
      id: 2,
      authorName: 'Daniel Kahneman',
      affiliation: 'Professor Emeritus, Princeton University',
    },
  ],
  [
    3,
    {
      id: 3,
      authorName: 'James Clear',
      affiliation: 'Founder of The Habits Academy',
    },
  ],
  [
    4,
    {
      id: 4,
      authorName: 'Judson A. Brewer',
      affiliation: 'Director of Research and Innovation, Brown University',
    },
  ],
  [
    5,
    {
      id: 5,
      authorName: 'Stephen Covey',
      affiliation: 'Jon M. Huntsman School of Business',
    },
  ],
]);

export const generatedBooks: Books = new Map<BookId, BookInterface>([
  [
    0,
    {
      id: 0,
      title: 'How to Have Impossible Conversations: A Very Practical Guide',
      isbn: ['978-0-7382-8532-0', '978-0-7382-8534-4'],
      year: 2019,
      publisher: 'Hachette Book Group, Inc.',
    },
  ],
  [
    1,
    {
      id: 1,
      title:
        'The 7 Habits of Highly Effective People: 30th Anniversary Edition',
      isbn: ['978-1-9821-3713-7', '978-1-9821-3727-4', '978-1-9821-4381-7'],
      year: 2020,
      publisher: 'Simon & Schuster',
    },
  ],
  [
    2,
    {
      id: 2,
      title: 'Thinking, Fast and Slow',
      isbn: ['978-0-374-27563-1'],
      year: 2011,
      publisher: 'Farrar, Straus and Giroux',
      subjects: [
        'Thought and thinking',
        'Decision making',
        'Intuition',
        'Reasoning',
      ],
    },
  ],
  [
    3,
    {
      id: 3,
      title: 'Atomic Habits: Tiny Changes, Remarkable Results',
      isbn: ['9780735211292', '9780593189641'],
      year: 2018,
      publisher: 'Penguin Random House',
      description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    },
  ],
  [
    4,
    {
      id: 4,
      title: 'Unwinding Anxiety',
      isbn: ['9780593330449', '9780593330456'],
      year: 2021,
      publisher: 'Penguin Random House',
      subjects: ['Anxiety', 'Habit breaking', 'Change'],
    },
  ],
]);

export const generatedAuthorToBooksTable = new Map<AuthorId, Set<BookId>>([
  [0, new Set<BookId>([0])],
  [1, new Set<BookId>([0])],
  [2, new Set<BookId>([2])],
  [3, new Set<BookId>([3])],
  [4, new Set<BookId>([4])],
  [5, new Set<BookId>([1])],
]);

export const generatedBookToAuthorsTable = new Map<BookId, Set<AuthorId>>([
  [0, new Set<AuthorId>([0, 1])],
  [1, new Set<AuthorId>([5])],
  [2, new Set<AuthorId>([2])],
  [3, new Set<AuthorId>([3])],
  [4, new Set<AuthorId>([4])],
]);

export function generateAuthors(): Authors {
  return new Map<AuthorId, AuthorInterface>([
    [
      0,
      {
        id: 0,
        authorName: 'Peter Boghossian',
        affiliation:
          'Portland State University, Philosophy Department, Faculty Member',
      },
    ],
    [
      1,
      {
        id: 1,
        authorName: 'James Lindsay',
        affiliation: 'Consultant at New Discourses',
      },
    ],
    [
      2,
      {
        id: 2,
        authorName: 'Daniel Kahneman',
        affiliation: 'Professor Emeritus, Princeton University',
      },
    ],
    [
      3,
      {
        id: 3,
        authorName: 'James Clear',
        affiliation: 'Founder of The Habits Academy',
      },
    ],
    [
      4,
      {
        id: 4,
        authorName: 'Judson A. Brewer',
        affiliation: 'Director of Research and Innovation, Brown University',
      },
    ],
    [
      5,
      {
        id: 5,
        authorName: 'Stephen Covey',
        affiliation: 'Jon M. Huntsman School of Business',
      },
    ],
  ]);
}

export function generateBooks(): Books {
  return new Map<BookId, BookInterface>([
    [
      0,
      {
        id: 0,
        title: 'How to Have Impossible Conversations: A Very Practical Guide',
        isbn: ['978-0-7382-8532-0', '978-0-7382-8534-4'],
        year: 2019,
        publisher: 'Hachette Book Group, Inc.',
      },
    ],
    [
      1,
      {
        id: 1,
        title:
          'The 7 Habits of Highly Effective People: 30th Anniversary Edition',
        isbn: ['978-1-9821-3713-7', '978-1-9821-3727-4', '978-1-9821-4381-7'],
        year: 2020,
        publisher: 'Simon & Schuster',
      },
    ],
    [
      2,
      {
        id: 2,
        title: 'Thinking, Fast and Slow',
        isbn: ['978-0-374-27563-1'],
        year: 2011,
        publisher: 'Farrar, Straus and Giroux',
        subjects: [
          'Thought and thinking',
          'Decision making',
          'Intuition',
          'Reasoning',
        ],
      },
    ],
    [
      3,
      {
        id: 3,
        title: 'Atomic Habits: Tiny Changes, Remarkable Results',
        isbn: ['9780735211292', '9780593189641'],
        year: 2018,
        publisher: 'Penguin Random House',
        description:
          'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      },
    ],
    [
      4,
      {
        id: 4,
        title: 'Unwinding Anxiety',
        isbn: ['9780593330449', '9780593330456'],
        year: 2021,
        publisher: 'Penguin Random House',
        subjects: ['Anxiety', 'Habit breaking', 'Change'],
      },
    ],
  ]);
}
