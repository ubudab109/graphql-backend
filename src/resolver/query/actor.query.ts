import { ActorInterface } from "../../interface/actor.interface";
import { isLoggedIn } from "../../middleware/authContext";
import ActorModel from "../../model/actor.model";
import MovieModel from "../../model/movie.model";

/**
 * Find all actors, and include their movies, and include the actors in those movies.
 * @param {object} _parent
 * @param {object} _arg
 * @param {any} context - This is the context object that is passed to the resolver. It contains the
 * request object, the response object, and the user object.
 * @returns An array of objects.
 */
export const actorResolver = async (
  _parent: object,
  _arg: object,
  context: any
): Promise<ActorModel[] | []> => {
  isLoggedIn(context);
  const data = await ActorModel.findAll({
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
 * It's a resolver that takes in an actor id, and returns the actor with the corresponding id, along
 * with all the movies that actor has been in, and all the actors that have been in those movies
 * @param {object} _parent
 * @param {ActorInterface} arg - ActorInterface - argument that passed to schema
 * @param {any} context - This is the context object that is passed to the resolver. It contains the
 * request object, the response object, and the user object.
 * @returns An ActorModel object with a movies property that is an array of MovieModel objects.
 */
export const actorResolverById = async (
  _parent: object,
  arg: ActorInterface,
  context: any
): Promise<ActorModel | null> => {
  isLoggedIn(context);
  const data = await ActorModel.findOne({
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
