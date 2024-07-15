
export interface Tickets {
  id: number,
  bookId: number,
  userId: number,
  borrowDate: string,
  returnDate: string,
  quantity: number,
  status: string,
  title: string,
  name: string,
  }
  
  export type Ticket = Omit<Tickets, 'id' | 'title' | 'name'>
  export type TicketReturn = Pick<Tickets, 'id' | 'returnDate' | 'status'>