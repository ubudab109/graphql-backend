import { MovieInterface } from "../../interface/movie.interface";
import { isLoggedIn } from "../../middleware/authContext";
import ActorModel from "../../model/actor.model";
import AuthorModel from "../../model/author.model";
import MovieModel from "../../model/movie.model";


/**
 * It's a resolver function that returns a list of movies, each movie has a list of authors and actors
 * @param {object} _parent - 
 * @param {object} _arg - object
 * @param {any} context - any - This is the context object that is passed to the resolver.
 * @returns MovieModel[] | []
 */
export const movieResolver = async (
  _parent: object,
  _arg: object,
  context: any
): Promise<MovieModel[] | []> => {
  isLoggedIn(context);
  const data = await MovieModel.findAll({
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

  return data;
};


/**
 * It's a resolver that returns a movie by id.
 * @param {object} _parent
 * @param {MovieInterface} arg - MovieInterface
 * @param {any} context - any - This is the context object that is passed to the resolver.
 * @returns MovieModel | null
 */
export const movieResolverById = async (
  _parent: object,
  arg: MovieInterface,
  context: any
): Promise<MovieModel | null> => {
  isLoggedIn(context);
  const data = await MovieModel.findOne({
    where: {
      id: arg.id,
    },
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

  return data;
};
