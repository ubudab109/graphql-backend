import { ApolloServer } from '@apollo/server';
import { typeDefs } from './graphql/schema';
import { expressMiddleware } from '@apollo/server/express4';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dbInit from './model';
import resolvers from './resolver';
import { GraphQLError } from 'graphql';
import { validateAccessToken } from './helper/jwt';
import path from 'path';

require('dotenv').config();

dbInit();

const app = express();

interface MyContext {
  // You can optionally create a TS interface to set up types
  // for your contextValue
  authScope?: String;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers: resolvers,
  introspection: true,
});

const startServer = async (port : number) => {
  await server.start()
  app.use('/graphql', bodyParser.json(), expressMiddleware(server, {
    context: async ({req}) => {
      const token = req.headers.authorization || '';
      if (token !== '') {
        const user = validateAccessToken(token);
        if (user) {
          return user;
        } else {
          throw new GraphQLError('Credentials Invalid', {
            extensions: {
              status: { code: 'UNAUTHENTICATED', http_status: 401 },
              code: 'UNAUTHENTICATED'
            }
          });
        }
      }

      return {req};
    }
  }));

  app.use('/graphiql', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/index.html'));
  });

  app.listen({
    port: port
  })
  console.log(`Server Running at ${port}`);
}


startServer(Number(process.env.APP_PORT));