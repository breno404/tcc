import { Model } from "sequelize";
import { NonAbstract } from "sequelize-typescript/dist/shared/types";
import { IRepository } from "../types";

abstract class BaseRepository<T extends Model> implements IRepository<T> {
  constructor(
    protected readonly model: (new () => T) & NonAbstract<typeof Model>
  ) {}

  async create(entity: any): Promise<T> {
    return this.model.create(entity);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async update(id: any, entity: Partial<T>): Promise<[number, T[]]> {
    return this.model.update(entity, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: any): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}

export { BaseRepository };
