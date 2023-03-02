import { createContext } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  permissions: string[];
};

const defaultAccount: {
  user: User | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
} = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

const AccountContext = createContext(defaultAccount);

export default AccountContext;
