import { sequelizeInstance } from "../../config/database";
import { MovieInterface } from "../../interface/movie.interface";
import { isLoggedIn } from "../../middleware/authContext";
import MovieModel from "../../model/movie.model";

/**
 * It creates a new author in the database
 * @param {object} _parent - object - This is the parent object that is passed to the resolver.
 * @param {MovieInterface}  - MovieInterface - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The author object
 */
export const createMovie = async (
  _parent: object,
  { authorId, title, releaseDate, rating }: MovieInterface,
  context: any
): Promise<MovieModel | Error> => {
  isLoggedIn(context);

  const transaction = await sequelizeInstance.transaction();

  try {
    const movie = await MovieModel.create(
      {
        authorId,
        title,
        releaseDate,
        rating,
      },
      { transaction: transaction }
    );
    await transaction.commit();
    return movie;
  } catch (err: any) {
    transaction.rollback();
    throw Error(err);
  }
};

/**
 * It updates an author's fullname and email in the database
 * @param {object} _parent - object - This is the parent object that is passed to the resolver.
 * @param {MovieInterface}  - MovieInterface - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The author object
 */
export const updateMovie = async (
  _parent: object,
  { id, authorId, title, releaseDate, rating }: MovieInterface,
  context: any
): Promise<Object | Error> => {
  isLoggedIn(context);

  const transaction = await sequelizeInstance.transaction();

  try {
    await MovieModel.update(
      {
        authorId,
        title,
        releaseDate,
        rating,
      },
      {
        transaction: transaction,
        where: {
          id,
        },
      }
    );
    await transaction.commit();
    return {
      id,
      authorId,
      title,
      releaseDate,
      rating,
    };
  } catch (err: any) {
    transaction.rollback();
    throw Error(err);
  }
};

/**
 * It deletes an author from the database and returns the id of the deleted author
 * @param {object} _parent - object - This is the parent object that is passed to the resolver. In this
 * case, it is the Author object.
 * @param {MovieInterface}  - MovieInterface - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The id of the author that was deleted.
 */
export const deleteMovie = async (
  _parent: object,
  { id }: MovieInterface,
  context: any
): Promise<object | Error> => {
  isLoggedIn(context);

  const transaction = await sequelizeInstance.transaction();

  try {
    await MovieModel.destroy({ where: { id } });
    await transaction.commit();
    return {
      id,
    };
  } catch (err: any) {
    await transaction.rollback();
    throw Error(err);
  }
};
