import { useContext, useState } from "react";
import AccountContext from "../contexts/accountContext";

function useAccount() {
  const { user, accessToken, refreshToken } = useContext(AccountContext);

  return { user, accessToken, refreshToken };
}

export default useAccount;
