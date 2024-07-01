import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

export interface Ticket {
  id: number;
  borrowID: number;
  userID: number;
  bookID: number;
  username: string;
  bookname: string;
  quantity: number;
  price: number;
  borrowDate: string;
  returnDate: string;
  status: boolean;
}

export interface TicketContextType {
  tickets: Ticket[];
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
}

export const TicketContext = createContext<TicketContextType | undefined>(undefined);

const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
        "id": 1,
        "borrowID": 999,
        "userID": 1,
        "bookID": 3,
        "username": "nam",
        "bookname": "ABC",
        "quantity": 2,
        "price": 2000,
        "borrowDate": '2024-02-05',
        "returnDate": '2024-03-15',
        "status": true
      }
  ]);

  return (
    <TicketContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
