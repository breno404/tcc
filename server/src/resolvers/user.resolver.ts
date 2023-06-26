import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { UserInput } from "../types/input/user.input";
import { User as UserType } from "../types/object/user.type";
import UserService from "../services/user.service";
import LoggerService from "../services/logger.service";
import bcrypt from 'bcrypt'

@Resolver(UserType)
class UserResolver {
  @Query(() => UserType, { nullable: true })
  async userById(@Arg("id") id: string): Promise<UserType | null> {
    const service = new UserService();
    return service.findUserById(id);
  }

  @Query(() => UserType, { nullable: true })
  async userByEmail(@Arg("email") email: string): Promise<UserType | null> {
    const service = new UserService();
    return service.findUserByEmail(email);
  }

  @Query(() => [UserType], { nullable: true })
  async users(): Promise<UserType[]> {
    const service = new UserService();
    return service.findAllUsers();
  }

  //---------------------------------------------------------------------------
  @Mutation(() => UserType)
  async createUser(
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: UserInput
  ): Promise<UserType | null> {
    const service = new UserService();
    const salt = await bcrypt.genSalt(1000)
    const hashedPassword = await bcrypt.hash(data.password, salt)
    const user = await service.createUser({ ...data, password: hashedPassword });
    return user
  }

  @Mutation(() => UserType)
  async updateUser(
    @Arg("id") id: string,
    @Arg("data", { validate: { forbidUnknownValues: false } }) data: UserInput
  ): Promise<UserType | null> {
    const service = new UserService();
    if (data.password) {

      const saltRounds = 10

      const hashedPassword = await bcrypt.hash(data.password, saltRounds)

      const user = await service.updateUser(id, { ...data, password: hashedPassword });

      return user
    } else {
      const user = await service.updateUser(id, data);

      return user
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string): Promise<boolean> {
    const service = new UserService();
    const user = await service.updateUser(id, { active: false });

    if (user?.active) return false;
    return true;
  }
}

export { UserResolver };
