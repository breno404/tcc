import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { UserInput } from "../types/input/user.input";
import { User as UserType } from "../types/object/user.type";
import UserService from "../services/user.service";
import LoggerService from "../services/logger.service";

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
    return service.createUser(data);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Arg("id") id: string,
    @Arg("data", { validate: { forbidUnknownValues: false } }) data: UserInput
  ): Promise<UserType | null> {
    const service = new UserService();
    return service.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string): Promise<boolean> {
    const service = new UserService();
    return service.deleteUser(id);
  }
}

export { UserResolver };
