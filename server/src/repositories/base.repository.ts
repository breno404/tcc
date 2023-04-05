import { NonAbstract } from "sequelize-typescript/dist/shared/types";
import { IRepository } from "../types";
import { Model } from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

abstract class BaseRepository<T extends Model> implements IRepository<T> {
  constructor(
    protected readonly model: (new () => T) & NonAbstract<typeof Model>
  ) {}

  async create(entity: any): Promise<T> {
    return this.model.create(entity);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findByPk(id as unknown as string);
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async update(id: string, entity: Partial<T>): Promise<[number, T[]]> {
    console.log(entity);
    return this.model.update(entity, {
      where: { attribute: { ["id"]: id } },
      returning: true,
    });
  }

  async delete(id: string): Promise<number> {
    return this.model.destroy({ where: { attribute: { ["id"]: id } } });
  }
}

export { BaseRepository };
