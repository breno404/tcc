type UserAttribute =
  | "id"
  | "name"
  | "userName"
  | "email"
  | "phone"
  | "password";

type UserVariable = { [K in UserAttribute]?: string };

type UserFunction = (
  fields: UserAttribute[],
  variables?: UserVariable
) => string;
