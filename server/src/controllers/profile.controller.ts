import { Request, Response } from "express";
import UploadService from "../services/upload.service";
import fs from "fs";
import path from "path";
import UserService from "../services/user.service";

abstract class ProfileController {
  static async getProfileImageFromUserById(req: Request, res: Response) {
    const userId: string = req.body.userId;
    res.send("File");
  }

  static async uploadProfileImageToUserById(req: Request, res: Response) {
    const profile = req.file;
    const userId = req.body.userId;
    if (!userId)
      return res
        .status(400)
        .send("The user id must be submited with the file request.");
    if (!profile)
      return res.status(400).send("Request was submited without a file.");

    const userService = new UserService();
    const uploadService = new UploadService(
      path.resolve(__dirname, "../", "../", "uploads", userId)
    );
    const user = await userService.findUserById(userId);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const existsOldProfilePath = fs.existsSync(user.profile?.path as string);

    const profileStream = fs.createReadStream(profile.path);
    let destPath: string;

    if (existsOldProfilePath) {
      const oldProfileStream = fs.createWriteStream(
        user.profile?.path as string
      );
      destPath = await uploadService.upload(profileStream, oldProfileStream);
    } else destPath = await uploadService.upload(profileStream);

    await userService.syncProfileImageById(userId, destPath);

    return res.status(200).send("The profile was submited with success.");
  }

  static async deleteProfileImageFromUserById(req, res) {
    const userId = req.body.userId;

    const userService = new UserService();

    userService.deleteProfileImage(userId);
    res.send("Arquivo deletado com sucesso");
  }
}

export default ProfileController;
