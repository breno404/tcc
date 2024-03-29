import User from "../models/user.model";
import { BaseRepository } from "./base.repository";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ where: { email } });
  }
}

export { UserRepository };
