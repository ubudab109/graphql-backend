export const typeDefs =
`#graphql
  scalar Date
  scalar number

  type User {
    id: String
    username: String
    token: String
  }

  type Author {
    id: ID
    fullname: String
    email: String
    createdAt: Date
    updatedAt: Date
    movies: [Movie]
  }
  
  type Movie {
    id: ID
    title: String
    releaseDate: String
    rating: Int
    authorId: Int
    createdAt: Date
    updatedAt: Date
    authors: Author
    actors: [Actor]
  }

  type Actor {
    id: ID
    fullname: String
    movies: [Movie]
    createdAt: Date
    updatedAt: Date
  }


  input ActorInput {
    id: ID
  }

  type Query {
    movies: [Movie]
    authors: [Author]
    actors: [Actor]
    actorsById(id: ID!): Actor
    authorsById(id: ID!): Author
    moviesById(id: ID!): Movie
  }


  type Mutation {
    createAuthor(fullname: String!, email: String!): Author
    updateAuthor(id: ID!, fullname: String!, email: String!): Author
    deleteAuthor(id: ID!): Author
    createMovie(authorId: ID!, title: String, releaseDate: String, rating: Int): Movie
    updateMovie(id: ID!, authorId: ID, title: String, releaseDate: String, rating: Int): Movie
    deleteMovie(id: ID!): Movie
    createActor(fullname: String): Actor
    updateActor(id: ID!, fullname: String): Actor
    deleteActor(id: ID!): Actor
    assignActorToMovie(movieId: ID!, actors: [ActorInput!]!): Movie
    syncActorMovie(movieId: ID!, actors: [ActorInput!]!): Movie
    removeActorFromMovie(movieId: ID!, actorId: ID!): Movie
    login(username: String!, password: String!) : User
  }
`;
