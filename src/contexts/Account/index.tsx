import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

export interface Account {
  id: number;
  username: string;
  password: string;
  email: string;
  phone: number;
}

export interface AccountContextType {
  accounts: Account[];
  setAccounts: Dispatch<SetStateAction<Account[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  loggedID: number | null;
  setLoggedID: Dispatch<SetStateAction<number | null>>;
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined);

const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
        "id": 1,
        "username": "nam123",
        "password": "123123",
        "email": "tranquynhnam789@gmail.com",
        "phone": 799692994
      }
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedID, setLoggedID] = useState<number | null>(null);


  return (
    <AccountContext.Provider value={{ accounts, setAccounts, isLoggedIn, setIsLoggedIn, loggedID, setLoggedID }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
