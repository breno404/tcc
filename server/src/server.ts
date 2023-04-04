import "reflect-metadata";
import { ApolloServer } from "apollo-server";

import { UsersResolver } from "./resolvers/users-resolvers";
import { buildSchema } from "type-graphql";
import path from "node:path";

async function init() {
  const schema = await buildSchema({
    resolvers: [UsersResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();

  console.log(`HTTP server running on ${url}`);
}

init();
