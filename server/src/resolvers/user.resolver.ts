import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { UserRepository } from "../repositories/user.repository";
import { UserInput } from "../types/input/user.input";
import { User as UserType } from "../types/object/user.type";

@Resolver(UserType)
class UserResolver {
  private readonly userRepository = new UserRepository();

  @Query(() => UserType, { nullable: true })
  async userById(@Arg("id") id: string): Promise<UserType | null> {
    let user = await this.userRepository.findById(id);
    if (!user) return null;
    return user.toJSON();
  }

  @Query(() => UserType, { nullable: true })
  async userByEmail(@Arg("email") email: string): Promise<UserType | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    return user.toJSON();
  }

  @Query(() => [UserType], { nullable: true })
  async users(): Promise<UserType[]> {
    const users = (await this.userRepository.findAll()).map((u) => u.toJSON());
    return users;
  }

  //---------------------------------------------------------------------------
  @Mutation(() => UserType)
  async createUser(
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: UserInput
  ): Promise<UserType> {
    const user = await this.userRepository.create(data);
    if (!user) throw Error(`There was a failure creating the user`);
    return user;
  }

  @Mutation(() => UserType)
  async updateUser(
    @Arg("id") id: string,
    @Arg("data", { validate: { forbidUnknownValues: false } }) data: UserInput
  ): Promise<UserType | null> {
    await this.userRepository.update(id, data);

    const user = await this.userRepository.findById(id);

    if (!user) return null;
    return user.toJSON();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string): Promise<boolean> {
    const deletedRows = await this.userRepository.delete(id);
    return Boolean(deletedRows);
  }
}

export { UserResolver };
