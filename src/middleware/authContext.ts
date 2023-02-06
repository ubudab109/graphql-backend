import { GraphQLError } from "graphql"

/**
 * If the user is not logged in, throw an error. Otherwise, return true.
 * @param {any} data - any - This is the data that is passed to the resolver.
 * @returns a boolean value.
 */
export const isLoggedIn = (data: any) => {
  if (!data.user) {
    throw new GraphQLError('JSON Token Invalid', {
      extensions: {
        status: { code: 'UNAUTHENTICATED', http_status: 401 },
        code: 'UNAUTHENTICATED'
      }
    });
  } else {
    return true;
  }
};