import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface ReturnList {
  id: number;
  idUser: number;
  borrower: string;
  book: string;
  price: number;
  quantity: number;
  borrowDate: string;
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
      quantity: 2,
      price: 2500,
      borrowDate: '2024-05-10',
      returnDate: '2024-05-15',
      idUser: 999
    }
  ]);

  return (
    <ReturnListContext.Provider value={{ returnLists, setReturnLists }}>
      {children}
    </ReturnListContext.Provider>
  );
};

export default ReturnListProvider;
