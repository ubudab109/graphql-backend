import { createActor, deleteActor, updateActor } from './mutation/actor.mutation';
import { assignActorToMovie, removeActorFromMovie, syncActorMovie } from './mutation/actormovie.mutation';
import { login } from './mutation/auth.mutation';
import { createAuthor, deleteAuthor, updateAuthor } from './mutation/author.mutation';
import { createMovie, deleteMovie, updateMovie } from './mutation/movie.mutation';
import { actorResolver, actorResolverById } from './query/actor.query';
import { authorResolver, authorResolverById } from './query/author.query';
import { movieResolver, movieResolverById } from './query/movie.query';

const resolvers = {
  Query: {
    movies: movieResolver,
    moviesById: movieResolverById,
    authors: authorResolver,
    authorsById: authorResolverById,
    actors: actorResolver,
    actorsById: actorResolverById,
  },
  Mutation: {
    createAuthor: createAuthor,
    updateAuthor: updateAuthor,
    deleteAuthor: deleteAuthor,
    createMovie: createMovie,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie,
    createActor: createActor,
    updateActor: updateActor,
    deleteActor: deleteActor,
    assignActorToMovie: assignActorToMovie,
    syncActorMovie: syncActorMovie,
    removeActorFromMovie: removeActorFromMovie,
    login: login
  }
};

export default resolvers;
