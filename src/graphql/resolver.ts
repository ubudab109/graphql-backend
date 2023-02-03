
const authors = [
  {
    id: 1,
    fullname: 'Kate Chopin',
    email: 'kate@mail.com',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    movies: [{ 
      id: 1, 
      title: 'First Movie', 
      releaseDate: '2020', 
      rating: 5,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      actors: [
        {
          id: 1,
          fullname: 'Tobey Maguire',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 1,
          fullname: 'Robert Downey Junior',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ]
    }]
  },
  {
    id: 2,
    fullname: 'Paul Auster',
    email: 'kate@mail.com',
    movies: [
      {
        id: 2, 
        title: 'Second Movie', 
        releaseDate: '2022', 
        rating: 3,
        actors: [
          {
            id: 1,
            fullname: 'Tobey Maguire',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
          {
            id: 1,
            fullname: 'Robert Downey Junior',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ]
      }
    ]
  },
];

export const resolvers = {
  Query: {
    authors: () => authors,
  },
};
