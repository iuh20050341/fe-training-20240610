import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { Users } from '../../types/user.type';

export interface AccountContextType {
  accounts: Users[];
  setAccounts: Dispatch<SetStateAction<Users[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  loggedID: number | null;
  setLoggedID: Dispatch<SetStateAction<number | null>>;
  rulesID: number | null;
  setRulesID: Dispatch<SetStateAction<number | null>>;
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined);

const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


  const [accounts, setAccounts] = useState<Users[]>([
    {
      id: 0,
      name: 'Nam',
      email: 'tranquynhnam@gmail.com',
      gender: "MALE",
      address: "DT",
      age: 22,
      createAt: "asdas",
      updateAt: "sadasd",
      role:
      {
        id: 1,
        name: "asd",
      }
    }
  ]); // Initialize with fetchedUsers


  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedID, setLoggedID] = useState<number | null>(null);
  const [rulesID, setRulesID] = useState<number | null>(null);

  return (
    <AccountContext.Provider value={{ accounts, setAccounts, isLoggedIn, setIsLoggedIn, loggedID, setLoggedID, rulesID, setRulesID }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
