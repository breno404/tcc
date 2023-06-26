import moment from "moment";
import { File, User } from "../models";
import { UserRepository } from "../repositories/user.repository";
import { User as UserType } from "../types/object/user.type";
import LoggerService from "./logger.service";
import { v4 as uuid } from 'uuid'
import { sequelize } from "../database/config";

class UserService implements ISubject {
  private observers: IObserver[] = [];

  registerObserver(observer: IObserver): void {
    throw new Error("Method not implemented.");
  }
  removeObserver(observer: IObserver): void {
    throw new Error("Method not implemented.");
  }
  notifyObservers(args?: any): void {
    for (const observer of this.observers) {
      observer.update(args);
    }
  }

  notifyObserver(observerType: string, args?: any): void {
    for (const observer of this.observers) {
      if (observer.observerType === observerType) {
        observer.update(args);
      }
    }
  }

  private readonly userRepository = new UserRepository();

  async findUserById(id: string): Promise<UserType | null> {
    let user = await this.userRepository.findById(id);
    if (!user) return null;
    return user.toJSON();
  }

  async findUserByEmail(email: string): Promise<UserType | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    return user.toJSON();
  }

  async findAllUsers(): Promise<UserType[]> {
    const users = (await this.userRepository.findAll()).map((u) => u.toJSON());
    return users;
  }

  async createUser(attributes): Promise<UserType | null> {
    const id = uuid()
    try {
      const user = await this.userRepository.create({ ...attributes, id });
      if (!user) throw Error(`Something went wrong during user creation`);
      return user;
    } catch (err) {
      this.notifyObserver("LoggerService", (err as Error).toString());
      return null;
    }
  }

  async updateUser(
    id: string,
    attributes: Partial<UserType>
  ): Promise<UserType | null> {
    await this.userRepository.update(id, attributes);
    const user = await this.userRepository.findById(id);

    if (!user) return null;
    return user.toJSON();
  }

  async deleteUser(id: string): Promise<boolean> {
    const deletedRows = await this.userRepository.delete(id);
    return Boolean(deletedRows);
  }

  async syncProfileImageById(userId: any, destPath: string) {
    const id = uuid()
    const separatePath = destPath.split('/')
    const nameAndExt = separatePath.at(separatePath.length - 1)?.split('.')

    try {
      const user = await User.findByPk(userId);
      if (user) {
        const file = await File.create({ id, path: destPath, ext: String(nameAndExt?.at(1)), name: String(nameAndExt?.at(0)), lastModified: moment(new Date()).toDate() })

        await file.setUsers([user]); // Associa o arquivo ao usuário

        console.log('Arquivo criado e associado ao usuário com sucesso!');
      } else {
        console.log('Usuário não encontrado!');
      }
    } catch (error) {
      console.log('Erro ao criar e associar o arquivo:', error);
    }
  }
  deleteProfileImage(userId: any) {

  }
}

export default UserService;
