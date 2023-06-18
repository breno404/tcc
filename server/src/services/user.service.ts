import { UserRepository } from "../repositories/user.repository";
import { User as UserType } from "../types/object/user.type";
import LoggerService from "./logger.service"; 
import { v4 as uuid } from 'uuid'

class UserService implements ISubject {
  private observers: IObserver[];

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

  syncProfileImageById(userId: any, destPath: string) {

  }
  deleteProfileImage(userId: any) {

  }
}

export default UserService;
