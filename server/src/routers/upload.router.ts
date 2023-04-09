import { Router } from "express";
import upload from "../middlewares/multer.middleware";
import ProfileController from "../controllers/profile.controller";

const uploadRouter = Router();

uploadRouter.get("/profile", ProfileController.getProfileImageFromUserById);

uploadRouter.post(
  "/profile",
  upload.single("profile"),
  ProfileController.uploadProfileImageToUserById
);

uploadRouter.put("/profile", upload.single("profile"));

uploadRouter.delete("/profile", upload.single("profile"));

export default uploadRouter;
