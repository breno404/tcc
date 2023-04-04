import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { UserInput } from "../types/input/user.input";
import { User as UserType } from "../types/object/user.type";

@Resolver(UserType)
class UserResolver {
  private readonly userRepository = new UserRepository();

  @Query(() => UserType, { nullable: true })
  async user(@Arg("id") id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  @Query(() => [UserType])
  async users(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    return this.userRepository.create(data);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Arg("id") id: number,
    @Arg("data") data: UserInput
  ): Promise<User | null> {
    await this.userRepository.update(id, data);
    return this.userRepository.findById(id);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number): Promise<boolean> {
    const deletedRows = await this.userRepository.delete(id);
    return Boolean(deletedRows);
  }
}

export { UserResolver };
