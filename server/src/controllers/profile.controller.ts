import { Request, Response } from "express";
import UploadService from "../services/upload.service";
import fs from "fs";
import path from 'path'

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

    const uploadService = new UploadService(path.resolve(__dirname, "../", "../", "uploads",userId));
    const profileStream = fs.createReadStream(profile.path);
    uploadService.upload(profileStream);

    return res.status(200).send("The profile was submited with success.");
  }

  static async uploadExistingProfileImageToUserById(req, res) {
    const file = req.file;
    if (!file) {
      return res.status(400).send("Selecione um arquivo para enviar");
    }
    res.send("Arquivo enviado com sucesso");
  }

  static async deleteProfileImageFromUserById(req, res) {
    const file = req.file;
    if (!file) {
      return res.status(400).send("Selecione um arquivo para enviar");
    }
    res.send("Arquivo enviado com sucesso");
  }
}

export default ProfileController;
