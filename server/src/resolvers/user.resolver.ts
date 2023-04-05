import { Resolver, Query, Arg, Mutation } from "type-graphql";
import User from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { UserInput } from "../types/input/user.input";
import { User as UserType } from "../types/object/user.type";
import { v4 as uuidv4 } from "uuid";

@Resolver(UserType)
class UserResolver {
  private readonly userRepository = new UserRepository();

  @Query(() => UserType, { nullable: true })
  async userById(@Arg("id") id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  @Query(() => UserType, { nullable: true })
  async userByEmail(@Arg("email") email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  @Query(() => [UserType])
  async users(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  //---------------------------------------------------------------------------
  @Mutation(() => UserType)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    const UserAttributes: UserType = {
      id: uuidv4(),
      ...data,
    };
    return this.userRepository.create(data);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Arg("id") id: string,
    @Arg("data") data: UserInput
  ): Promise<User | null> {
    await this.userRepository.update(id, data);
    return this.userRepository.findById(id);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string): Promise<boolean> {
    const deletedRows = await this.userRepository.delete(id);
    return Boolean(deletedRows);
  }
}

export { UserResolver };
