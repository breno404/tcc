import { Attributes, Model } from "sequelize";

export interface IRepository<T extends Model> {
  create(entity: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, entity: Partial<T>): Promise<[number, T[]]>;
  delete(id: string): Promise<number>;
}
