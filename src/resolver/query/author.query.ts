import { AuthorInterface } from "../../interface/author.interface";
import { isLoggedIn } from "../../middleware/authContext";
import ActorModel from "../../model/actor.model";
import AuthorModel from "../../model/author.model";
import MovieModel from "../../model/movie.model";

/**
 * This function returns all authors, their movies, and the actors in those movies.
 * @param {object} _parent
 * @param {object} _arg
 * @param {any} context - This is the context object that is passed to the resolver. It contains the
 * request object, the response object, and the user object.
 * @returns An array of AuthorModel objects.
 */
export const authorResolver = async (
  _parent: object,
  _arg: object,
  context: any
): Promise<AuthorModel[] | null> => {
  isLoggedIn(context);
  const data = await AuthorModel.findAll({
    include: [
      {
        model: MovieModel,
        as: "movies",
        order: [["name", "asc"]],
        include: [
          {
            model: ActorModel,
          },
        ],
      },
    ],
  });

  return data;
};

/**
 * It's a resolver that returns an author by id, and includes all of the author's movies, and all of
 * the actors in each movie
 * @param {object} _parent - object
 * @param {AuthorInterface} arg - AuthorInterface - this is the interface that defines the type of the
 * argument that is passed to the resolver.
 * @param {any} context - This is the context object that is passed to the resolver.
 * @returns A single author with all of their movies and actors.
 */
export const authorResolverById = async (
  _parent: object,
  arg: AuthorInterface,
  context: any
): Promise<AuthorModel | null> => {
  isLoggedIn(context);
  const data = await AuthorModel.findOne({
    where: {
      id: arg.id,
    },
    include: [
      {
        model: MovieModel,
        as: "movies",
        order: [["name", "asc"]],
        include: [
          {
            model: ActorModel,
          },
        ],
      },
    ],
  });

  return data;
};
