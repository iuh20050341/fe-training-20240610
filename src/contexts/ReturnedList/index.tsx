import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface ReturnList {
  id: number;
  borrower: string;
  book: string;
  returnDate: string;
}

interface ReturnListContextType {
  returnLists: ReturnList[];
  setReturnLists: Dispatch<SetStateAction<ReturnList[]>>;
}

export const ReturnListContext = createContext<ReturnListContextType | undefined>(undefined);

const ReturnListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [returnLists, setReturnLists] = useState<ReturnList[]>([
    {
      id: 1,
      borrower: 'John Doe',
      book: 'The Great Gatsby',
      returnDate: '2024-05-15',
    },
    {
      id: 2,
      borrower: 'Jane Smith',
      book: 'To Kill a Mockingbird',
      returnDate: '2024-04-10',
    }
  ]);

  return (
    <ReturnListContext.Provider value={{ returnLists, setReturnLists }}>
      {children}
    </ReturnListContext.Provider>
  );
};

export default ReturnListProvider;
