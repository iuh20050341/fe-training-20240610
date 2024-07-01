import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface BorrowedBook {
  id: number;
  idUser: number;
  borrower: string;
  quantity: number;
  price: number;
  book: string;
  borrowDate: string;
}

interface BorrowContextType {
  borrowedBooks: BorrowedBook[];
  setBorrowedBooks: Dispatch<SetStateAction<BorrowedBook[]>>;
}

export const BorrowContext = createContext<BorrowContextType | undefined>(undefined);

const BorrowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([
    {
      id: 1,
      borrower: 'nam',
      book: 'The Great Gatsby',
      quantity: 2,
      price: 2000,
      borrowDate: '2024-06-23',
      idUser: 2
    }
  ]);

  return (
    <BorrowContext.Provider value={{ borrowedBooks, setBorrowedBooks }}>  
      {children}
    </BorrowContext.Provider>
  );
};

export default BorrowProvider;
