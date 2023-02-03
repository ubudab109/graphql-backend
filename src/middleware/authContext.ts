import { GraphQLError } from "graphql"

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