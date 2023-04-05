import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import dataBase from "./database/init";
//import config from "@/config/config";

export default async function init() {
  dataBase.init();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({ schema });

  await server.listen(3000);
  console.log("Server has started!");
}
