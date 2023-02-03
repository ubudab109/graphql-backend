import { GraphQLError } from "graphql";
import { comparePassword } from "../../helper/helper";
import { setToken } from "../../helper/jwt";
import { UserInterface } from "../../interface/user.interface";
import UserModel from "../../model/user.model";

/**
 * It takes in a username and password, finds the user in the database, compares the password, and
 * returns a token if the password is correct
 * @param {any} _parent - any - This is the parent object. In this case, it's the root object.
 * @param {UserInterface}  - UserInterface - this is the type of the input parameters
 * @returns The return value is a promise.
 */
export const login = async (
  _parent: any,
  { username, password }: UserInterface
) => {
  const user = await UserModel.findOne({ where: { username: username } });
  if (
    user &&
    (await comparePassword(String(password), String(user.password)))
  ) {
    const test = setToken(user);
    console.log(test);
    return test;
  } else {
    throw new GraphQLError("Invalid Credential", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
};
