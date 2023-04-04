import { CreateUserInput } from "../dtos/inputs/create-user-input";
import { Query, Mutation, Resolver, Arg } from "type-graphql";
import { UserModel } from "../dtos/models/user-model";

@Resolver()
export class UsersResolver {
  @Query(() => String!)
  async helloWorld() {
    return "Hello World!";
  }

  @Mutation(() => UserModel)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user: UserModel = {
      userName: data.userName,
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    return user;
  }
}
