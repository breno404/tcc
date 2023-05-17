import "reflect-metadata";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers/user.resolver";
import { CustomerResolver } from "./resolvers/customer.resolver";
import dataBase from "./database/init";
import uploadRouter from "./routers/upload.router";
import multer from "multer";
//import config from "@/config/config";

export default async function init() {
  dataBase.init();

  const schema = await buildSchema({
    resolvers: [UserResolver, CustomerResolver],
  });

  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use("/upload", uploadRouter);
  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(3000, () => {
    console.log(
      `Servidor rodando em http://localhost:3000${server.graphqlPath}`
    );
  });
}
