import "reflect-metadata";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { UserResolver } from "./resolvers/user.resolver";
import { CustomerResolver } from "./resolvers/customer.resolver";
import dataBase from "./database/init";
import uploadRouter from "./routers/upload.router";
import multer from "multer";
import { SupplierResolver } from "./resolvers/supplier.resolver";
import { ProductResolver } from "./resolvers/product.resolver";
import { PurchaseResolver } from "./resolvers/purchase.resolver";
import { SaleResolver } from "./resolvers/sale.resolver";
import authMiddleware from "./middlewares/authenticate.middleware";
import authenticateRouter from "./routers/authenticate.router";
//import config from "@/config/config";

export default async function init() {
  dataBase.init();

  const authChecker = ({ context }: { context: { user: any } }) => {
    if (!context.user) {
      throw new AuthenticationError('Usuário não autenticado');
    }
    return true;
  };

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      CustomerResolver,
      SupplierResolver,
      ProductResolver,
      SaleResolver,
      PurchaseResolver
    ],
    //authChecker
  });

  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use("/authenticate", authenticateRouter);
  app.use("/upload", uploadRouter);
  const server = new ApolloServer({
    // context: ({ req }) => {
    //   return authMiddleware(req);
    // },
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
