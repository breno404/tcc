import { NonAbstract } from "sequelize-typescript/dist/shared/types";
import {Attributes,Model} from 'sequelize'
import {Col,Fn,Literal} from 'sequelize/types/utils'
import { IRepository } from "../types";
import {  } from "sequelize";

abstract class BaseRepository<T extends Model> implements IRepository<T> {
  constructor(
    protected readonly model: (new () => T) & NonAbstract<typeof Model>
  ) {}

  async create(entity:Attributes<T>): Promise<(T & any) | null> {
    return this.model.create(entity);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async update(id: string, entity: { [key in keyof Attributes<T>]?: Fn | Col | Literal | Attributes<T>[key] | undefined; }): Promise<[number, T[]]> {
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
