import { sequelizeInstance } from "../../config/database";
import { AuthorInterface } from "../../interface/author.interface";
import { isLoggedIn } from "../../middleware/authContext";
import AuthorModel from "../../model/author.model";

/**
 * It creates a new author in the database
 * @param {object} _parent - object - This is the parent object that is passed to the resolver.
 * @param {AuthorInterface}  - AuthorInterface - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The author object
 */
export const createAuthor = async (
  _parent: object,
  { fullname, email }: AuthorInterface,
  context: any
): Promise<AuthorModel | Error> => {
  isLoggedIn(context);

  const transaction = await sequelizeInstance.transaction();

  try {
    const author = await AuthorModel.create(
      {
        fullname,
        email,
      },
      { transaction: transaction }
    );
    await transaction.commit();
    return author;
  } catch (err: any) {
    await transaction.rollback();
    throw Error(err);
  }
};

/**
 * It updates an author's fullname and email in the database
 * @param {object} _parent - object - This is the parent object that is passed to the resolver.
 * @param {AuthorInterface}  - AuthorInterface - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The author object
 */
export const updateAuthor = async (
  _parent: object,
  { id, fullname, email }: AuthorInterface,
  context: any
): Promise<Object | Error> => {
  isLoggedIn(context);

  const transaction = await sequelizeInstance.transaction();

  try {
    let data: AuthorInterface = {
      fullname,
      email,
    };
    await AuthorModel.update(data, {
      transaction: transaction,
      where: {
        id,
      },
    });
    await transaction.commit();
    return {
      id,
      fullname,
      email,
    };
  } catch (err: any) {
    await transaction.rollback();
    throw Error(err);
  }
};

/**
 * It deletes an author from the database and returns the id of the deleted author
 * @param {object} _parent - object - This is the parent object that is passed to the resolver. In this
 * case, it is the Author object.
 * @param {AuthorInterface}  - AuthorInterface - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The id of the author that was deleted.
 */
export const deleteAuthor = async (
  _parent: object,
  { id }: AuthorInterface,
  context: any
): Promise<object | Error> => {
  isLoggedIn(context);

  const transaction = await sequelizeInstance.transaction();

  try {
    await AuthorModel.destroy({ where: { id } });
    await transaction.commit();
    return {
      id,
    };
  } catch (err: any) {
    await transaction.rollback();
    throw Error(err);
  }
};
