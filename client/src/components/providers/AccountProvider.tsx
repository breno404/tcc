import AccountContext from "@/contexts/accountContext";

type AccountProviderProps = {
  account: {
    user: {
      id: number;
      name: string;
      email: string;
      admin: false;
      permissions: string[];
    };
    accessToken: string;
    refreshToken: string;
  };
  children: JSX.Element | any;
};

function AccountProvider({ account, children }: AccountProviderProps) {
  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
}

export default AccountProvider;
