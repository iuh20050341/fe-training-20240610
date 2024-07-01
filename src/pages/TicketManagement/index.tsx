import React, { useEffect, useContext, useState } from 'react';
import { Container, Box } from '@mui/material';
import TicketList from './TicketList/index.tsx';
import { TicketContext, TicketContextType } from '../../contexts/Ticket/index.tsx';
import SearchInputBase from '../../components/Input/Search/index.tsx';
import 'react-toastify/dist/ReactToastify.css';
import TicketDetail from './TicketDetail/index.tsx';

interface Ticket {
  id: number;
  username: string;
  bookname: string;
  quantity: string;
  price: number;
  borrowDate: string;
  returnDate: string;
  status: string;
}

const TicketManagement = () => {
  const context = useContext(TicketContext) as TicketContextType;
  if (!context) {
    throw new Error('ERROR!');
  }
  const { tickets } = context;

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'username', headerName: 'BorrowerName' },
    { field: 'bookname', headerName: 'BookName' },
    { field: 'borrowDate', headerName: 'BorrowDate' },
    { field: 'returnDate', headerName: 'ReturnDate' },
    { field: 'status', headerName: 'Status' },
  ];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [ticketToRead, setTicketToRead] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  useEffect(() => {
    setFilteredTickets(
      tickets.filter(
        (ticket) =>
          ticket.username.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.bookname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [tickets, searchQuery]);

  const handleReadTicket = (ticket: Ticket) => {
    setTicketToRead(ticket);
    setIsFormOpen(true);
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleSearch = (searchTerm: string) => {
    setCurrentPage(1); // Reset to the first page when searching
    const results = tickets.filter(
      (ticket) =>
        ticket.username.toLowerCase().includes(searchTerm.toLowerCase()) || ticket.bookname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTickets(results);
    setSearchQuery(searchTerm);
  };

  const actionList = ['Read'];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <SearchInputBase onSearch={handleSearch} placehoder='Search Ticket' />
      </Box>
      <TicketList tickets={filteredTickets} onAction={actionList} onRead={handleReadTicket} currentPage={currentPage} setCurrentPage={setCurrentPage} heads={columns} />
      <TicketDetail open={isFormOpen} handleClose={handleFormClose} ticketToRead={ticketToRead}/>

    </Container>
  );
};

export default TicketManagement;
