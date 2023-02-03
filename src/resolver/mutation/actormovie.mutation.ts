import { ActorInterface } from "../../interface/actor.interface";
import { ActorMovieInterface } from "../../interface/actormovie.interface";
import { isLoggedIn } from "../../middleware/authContext";
import ActorModel from "../../model/actor.model";
import ActorMovieModel from "../../model/actormovie.model";
import AuthorModel from "../../model/author.model";
import MovieModel from "../../model/movie.model";

/**
 * It takes a movieId and an array of actorIds, creates a new row in the ActorMovie table for each
 * actorId, and returns the movie
 * @param {object} _parent - object - this is the parent object that is passed to the resolver. In this
 * case, it's the Movie object.
 * @param {movieId, actors} - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The movie object with the actors assigned to it.
 */
export const assignActorToMovie = async (
  _parent: object,
  { movieId, actors }: { movieId: number; actors: Array<ActorInterface> },
  context: any
): Promise<MovieModel | null> => {
  isLoggedIn(context);

  var data: Array<ActorMovieInterface> = [];

  actors.forEach((value) => {
    data.push({
      movieId: movieId,
      actorId: value.id!,
    });
  });

  await ActorMovieModel.bulkCreate(data);

  return await MovieModel.findByPk(movieId, {
    include: [
      {
        model: AuthorModel,
        as: "authors",
      },
      {
        model: ActorModel,
        as: "actors",
      },
    ],
  });
};

/**
 * It deletes all the actor-movie data first, then it creates new actor-movie data
 * @param {object} _parent - object,
 * @param {movieId, actors} - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns MovieModel
 */
export const syncActorMovie = async (
  _parent: object,
  { movieId, actors }: { movieId: number; actors: Array<ActorInterface> },
  context: any
): Promise<MovieModel | null> => {
  isLoggedIn(context);

  // DELETE ACTOR MOVIE DATA FIRST
  await ActorMovieModel.destroy({ where: { movieId } }).then(async () => {
    var data: Array<ActorMovieInterface> = [];
    actors.forEach((value) => {
      data.push({
        movieId: movieId,
        actorId: value.id!,
      });
    });
    await ActorMovieModel.bulkCreate(data);
  });

  return await MovieModel.findByPk(movieId, {
    include: [
      {
        model: AuthorModel,
        as: "authors",
      },
      {
        model: ActorModel,
        as: "actors",
      },
    ],
  });
};

/**
 * It removes an actor from a movie by deleting the actor-movie relationship from the actor_movie table
 * @param {object} _parent - object - this is the parent object that is passed in from the previous
 * resolver.
 * @param {ActorMovieInterface}  - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The movie with the actor removed.
 */
export const removeActorFromMovie = async (
  _parent: object,
  { movieId, actorId }: ActorMovieInterface,
  context: any
): Promise<MovieModel | null> => {
  isLoggedIn(context);

  await ActorMovieModel.destroy({
    where: {
      movieId,
      actorId,
    },
  });

  return await MovieModel.findByPk(movieId, {
    include: [
      {
        model: AuthorModel,
        as: "authors",
      },
      {
        model: ActorModel,
        as: "actors",
      },
    ],
  });
};
