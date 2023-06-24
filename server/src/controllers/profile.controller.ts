import { Request, Response } from "express";
import UploadService from "../services/upload.service";
import fs from "fs";
import path from "path";
import UserService from "../services/user.service";
import CustomerService from "../services/customer.service";
import SupplierService from "../services/supplier.service";

class ProfileController {
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

  static async getProfileImageFromCustomerById(req: Request, res: Response) {
    const customerId: string = req.body.customerId;
    res.send("File");
  }

  static async uploadProfileImageToCustomerById(req: Request, res: Response) {
    const profile = req.file;
    const customerId = req.body.customerId;
    if (!customerId)
      return res
        .status(400)
        .send("The customer id must be submited with the file request.");
    if (!profile)
      return res.status(400).send("Request was submited without a file.");

    const customerService = new CustomerService();
    const uploadService = new UploadService(
      path.resolve(__dirname, "../", "../", "uploads", customerId)
    );
    const customer = await customerService.findCustomerById(customerId);

    if (!customer) {
      return res.status(404).send("Customer not found.");
    }

    const existsOldProfilePath = fs.existsSync(customer.profile?.path as string);

    const profileStream = fs.createReadStream(profile.path);
    let destPath: string;

    if (existsOldProfilePath) {
      const oldProfileStream = fs.createWriteStream(
        customer.profile?.path as string
      );
      destPath = await uploadService.upload(profileStream, oldProfileStream);
    } else destPath = await uploadService.upload(profileStream);

    await customerService.syncProfileImageById(customerId, destPath);

    return res.status(200).send("The profile was submited with success.");
  }

  static async deleteProfileImageFromCustomerById(req, res) {
    const customerId = req.body.customerId;

    const customerService = new CustomerService();

    customerService.deleteProfileImage(customerId);
    res.send("Arquivo deletado com sucesso");
  }

  static async getProfileImageFromSupplierById(req: Request, res: Response) {
    const supplierId: string = req.body.supplierId;
    res.send("File");
  }

  static async uploadProfileImageToSupplierById(req: Request, res: Response) {
    const profile = req.file;
    const supplierId = req.body.supplierId;
    if (!supplierId)
      return res
        .status(400)
        .send("The supplier id must be submited with the file request.");
    if (!profile)
      return res.status(400).send("Request was submited without a file.");

    const supplierService = new SupplierService();
    const uploadService = new UploadService(
      path.resolve(__dirname, "../", "../", "uploads", supplierId)
    );
    const supplier = await supplierService.findSupplierById(supplierId);

    if (!supplier) {
      return res.status(404).send("Supplier not found.");
    }

    const existsOldProfilePath = fs.existsSync(supplier.profile?.path as string);

    const profileStream = fs.createReadStream(profile.path);
    let destPath: string;

    if (existsOldProfilePath) {
      const oldProfileStream = fs.createWriteStream(
        supplier.profile?.path as string
      );
      destPath = await uploadService.upload(profileStream, oldProfileStream);
    } else destPath = await uploadService.upload(profileStream);

    await supplierService.syncProfileImageById(supplierId, destPath);

    return res.status(200).send("The profile was submited with success.");
  }

  static async deleteProfileImageFromSupplierById(req, res) {
    const supplierId = req.body.supplierId;

    const supplierService = new SupplierService();

    supplierService.deleteProfileImage(supplierId);
    res.send("Arquivo deletado com sucesso");
  }
}

export default ProfileController;
