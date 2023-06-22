import { Router } from "express";
import upload from "../middlewares/multer.middleware";
import ProfileController from "../controllers/profile.controller";

const uploadRouter = Router();

uploadRouter.get("/profile/user", ProfileController.getProfileImageFromUserById);

uploadRouter.post(
  "/profile/user",
  upload.single("profile"),
  ProfileController.uploadProfileImageToUserById
);

uploadRouter.put(
  "/profile/user",
  upload.single("profile"),
  ProfileController.uploadProfileImageToUserById
);

uploadRouter.delete(
  "/profile/user",
  ProfileController.deleteProfileImageFromUserById
);

uploadRouter.get("/profile/customer", ProfileController.getProfileImageFromCustomerById);

uploadRouter.post(
  "/profile/customer",
  upload.single("profile"),
  ProfileController.uploadProfileImageToCustomerById
);

uploadRouter.put(
  "/profile/customer",
  upload.single("profile"),
  ProfileController.uploadProfileImageToCustomerById
);

uploadRouter.delete(
  "/profile/customer",
  ProfileController.deleteProfileImageFromCustomerById
);

uploadRouter.get("/profile/supplier", ProfileController.getProfileImageFromSupplierById);

uploadRouter.post(
  "/profile/supplier",
  upload.single("profile"),
  ProfileController.uploadProfileImageToSupplierById
);

uploadRouter.put(
  "/profile/supplier",
  upload.single("profile"),
  ProfileController.uploadProfileImageToSupplierById
);

uploadRouter.delete(
  "/profile/supplier",
  ProfileController.deleteProfileImageFromSupplierById
);

export default uploadRouter;
