import jwt from 'jsonwebtoken';
import { UserInterface } from '../interface/user.interface';
import { Context } from '../interface/context.interface';

require('dotenv').config();

const {sign, verify} = jwt;

/**
 * It takes an object with an id property and returns an object with an id and accessToken property.
 * @param {UserInterface}  - UserInterface = {id: string}
 * @returns {id, username, toke}
 */
export const setToken = ({id, username}: Context): object => {
  const user = { user: { id, username } };

  const token = sign(user, String(process.env.JWT_SECRET));

  return {id, username, token};
}

/**
 * It takes a token as a string, and returns the decoded token if it's valid, otherwise it throws an
 * error
 * @param {string} token - The token to be validated
 * @returns The decoded token.
 */
export const validateAccessToken = (token: string) => {
  try {
    const data = verify(token, String(process.env.JWT_SECRET));
    return data;
  } catch (err : any) {
    return null;
  }
}