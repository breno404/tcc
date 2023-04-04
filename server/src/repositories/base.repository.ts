import { Model, Op } from "sequelize";

//implements IRepository<T>
abstract class BaseRepository<T extends Model> {
  constructor(protected readonly model: typeof Model) {}

  async create(entity): Promise<T> {
    return this.model.create(entity);
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async update(id, entity: Partial<T>): Promise<[number, T[]]> {
    return this.model.update(entity, {
      where: { id },
      returning: true,
    });
  }

  async delete(id): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}

export { BaseRepository };
