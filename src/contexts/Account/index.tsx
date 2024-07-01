import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from 'react';
import { Users } from '../../types/user.type';
import { useQuery } from '@tanstack/react-query';
import userApi from '../../api/userApi.ts';

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
  const { data: fetchedUsers = [], refetch } = useQuery<Users[], Error>({
    queryKey: ['users'],
    queryFn: () => userApi.getAll().then(response => response.data.data.result),
    refetchOnWindowFocus: true,
  });

  const [accounts, setAccounts] = useState<Users[]>(fetchedUsers); // Initialize with fetchedUsers

  useEffect(() => {
    if (fetchedUsers.length > 0) {
      setAccounts(fetchedUsers);
    }
  }, [fetchedUsers]);

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
