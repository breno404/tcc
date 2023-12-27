import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authenticateRouter = Router();


authenticateRouter.post(
  "/",
  AuthController.AuthenticateUser
);


export default authenticateRouter;
