import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema";
import { expressMiddleware } from "@apollo/server/express4";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dbInit from "./model";
import resolvers from "./resolver";
import { GraphQLError } from "graphql";
import { validateAccessToken } from "./helper/jwt";
import { Context } from "./interface/context.interface";
import { renderGraphiql } from "./view/graphiql.view";

require("dotenv").config();

dbInit();

const app = express();
app.set("views", ".html");

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers: resolvers,
  introspection: true,
});

const startServer = async (port: number) => {
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["https://backend-graphql-test.herokuapp.com"],
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        if (token !== "") {
          const user = validateAccessToken(token);
          if (user) {
            return user;
          } else {
            throw new GraphQLError("Credentials Invalid", {
              extensions: {
                status: { code: "UNAUTHENTICATED", http_status: 401 },
                code: "UNAUTHENTICATED",
              },
            });
          }
        }

        return { req };
      },
    })
  );

  app.use("/graphiql", renderGraphiql);

  app.listen({
    port: port,
  });
  console.log(`Server Running at ${port}`);
};

startServer(Number(process.env.PORT) || 3000);
