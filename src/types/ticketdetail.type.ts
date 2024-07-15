import { Books } from "./book.type";
import { Tickets } from "./ticket.type";
import { Users } from "./user.type";

export interface TicketChild {
  id: number,
  bookId: number,
  borrowDate: string,
  returnDate: string,
  quantity: number,
  status: string,
  books: Books
}

export interface TicketDetails {
  id: number,
  ticketId: number,
  userId: number,
  }
  
export type TicketDetail = Omit<TicketDetails, 'id'>