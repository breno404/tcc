import { Model } from "sequelize";

export interface IRepository<T extends Model> {
  create(entity: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, entity: T): Promise<[number, T[]]>;
  delete(id: string): Promise<number>;
}
