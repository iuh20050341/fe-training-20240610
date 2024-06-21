import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface BorrowedBook {
  id: number;
  borrower: string;
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
      borrower: 'John Doe',
      book: 'The Great Gatsby',
      borrowDate: '2024-05-16'
    },
    {
      id: 2,
      borrower: 'Jane Smith',
      book: 'To Kill a Mockingbird',
      borrowDate: '2023-09-30'
    },
    {
      id: 3,
      borrower: 'Alice Johnson',
      book: '1984',
      borrowDate: '2024-02-05'
    },
  ]);

  return (
    <BorrowContext.Provider value={{ borrowedBooks, setBorrowedBooks }}>
      {children}
    </BorrowContext.Provider>
  );
};

export default BorrowProvider;
