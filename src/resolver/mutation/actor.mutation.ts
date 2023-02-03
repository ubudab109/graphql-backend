import { sequelizeInstance } from "../../config/database";
import { ActorInterface } from "../../interface/actor.interface";
import { isLoggedIn } from "../../middleware/authContext";
import ActorModel from "../../model/actor.model";

/**
 * It creates a new actor in the database
 * @param {object} _parent - object - This is the parent object that is passed to the resolver.
 * @param {ActorInterface}  - ActorInterface - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The actor object
 */
export const createActor = async (
  _parent: object,
  { fullname }: ActorInterface,
  context: any
): Promise<ActorModel | Error> => {
  isLoggedIn(context);

  const transaction = await sequelizeInstance.transaction();

  try {
    const actor = await ActorModel.create(
      {
        fullname,
      },
      { transaction: transaction }
    );
    await transaction.commit();
    return actor;
  } catch (err: any) {
    await transaction.rollback();
    throw Error(err);
  }
};

/**
 * It updates an actor's fullname and email in the database
 * @param {object} _parent - object - This is the parent object that is passed to the resolver.
 * @param {ActorInterface}  - ActorInterface - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The actor object
 */
export const updateActor = async (
  _parent: object,
  { id, fullname }: ActorInterface,
  context: any
): Promise<Object | Error> => {
  isLoggedIn(context);

  const transaction = await sequelizeInstance.transaction();

  try {
    await ActorModel.update(
      {
        fullname,
      },
      {
        transaction: transaction,
        where: {
          id,
        },
      }
    );
    transaction.commit();
    return {
      id,
      fullname,
    };
  } catch (err: any) {
    transaction.rollback();
    throw Error(err);
  }
};

/**
 * It deletes an actor from the database and returns the id of the deleted actor
 * @param {object} _parent - object - This is the parent object that is passed to the resolver. In this
 * case, it is the actor object.
 * @param {ActorInterface}  - ActorInterface - argument that will be passed to schema.
 * @param {any} context - This is the context object that is passed to the resolver.
 * It contains the request object, the response object, and the user object.
 * @returns The id of the actor that was deleted.
 */
export const deleteActor = async (
  _parent: object,
  { id }: ActorInterface,
  context: any
): Promise<object | Error> => {
  isLoggedIn(context);

  const transaction = await sequelizeInstance.transaction();

  try {
    await ActorModel.destroy({ where: { id } });
    transaction.commit();
    return {
      id,
    };
  } catch (err: any) {
    transaction.rollback();
    throw Error(err);
  }
};
