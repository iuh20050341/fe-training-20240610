import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import TicketList from "./TicketList/index.tsx";
import SearchInputBase from "../../components/Input/Search/index.tsx";
import "react-toastify/dist/ReactToastify.css";
import TicketDetail from "./TicketDetail/index.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import ticketApi from "../../api/ticketApi.ts";
import { Tickets } from "../../types/ticket.type.ts";
import ticketdetailApi from "../../api/ticketdetailApi.ts";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryString } from "../../utils/utils.ts";

const pageSize = 5;

const TicketManagement = () => {
  const [fetchError, setFetchError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const queryString: { pageNumber?: string } = useQueryString();
  const pageNumber = Number(queryString.pageNumber) || 1;

  const { data: fetchedTickets = [], refetch } = useQuery<Tickets[], Error>({
    queryKey: ["tickets", pageNumber, searchQuery],
    queryFn: async () => {
      try {
        const response = await ticketApi.getAll(pageNumber, pageSize);
        return response.data.data.result || [];
      } catch (error) {
        setFetchError(true);
        throw error;
      }
    },
    retry: false,
  });

  // const { data: fetchedTickets = [], refetch } = useQuery<Tickets[], Error>({
  //   queryKey: ["tickets"],
  //   queryFn: async () => {
  //     try {
  //       const response = await ticketApi.getAll();
  //       return response.data.data.result || [];
  //     } catch (error) {
  //       setFetchError(true);
  //       throw error;
  //     }
  //   },
  //   retry: false, // Không retry khi co loi
  // });

  const totalPages = Math.ceil(fetchedTickets.length / pageSize);

  // const context = useContext(TicketContext) as TicketContextType;
  // if (!context) {
  //   throw new Error('ERROR!');
  // }
  // const { tickets } = context;

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "BorrowerName" },
    { field: "title", headerName: "BookName" },
    { field: "borrowDate", headerName: "BorrowDate" },
    { field: "returnDate", headerName: "ReturnDate" },
    { field: "status", headerName: "Status" },
  ];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [ticketToRead, setTicketToRead] = useState<Tickets | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTickets, setFilteredTickets] = useState(fetchedTickets);

  useEffect(() => {
    if (fetchError) return;
    if (fetchedTickets && fetchedTickets.length > 0) {
      const results = fetchedTickets.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTickets(results);
    }
  }, [fetchedTickets, fetchError, searchQuery]);

  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);

  const readMutation = useMutation({
    mutationFn: (id: string | number) => ticketdetailApi.get(id),
    onSuccess: (response) => {
      setTicketToRead(response.data.data);
      setIsFormOpen(true);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        setTimeout(() => {
          if (error.response) {
            toast.error(error.response.data.message);
          }
        }, 1500);
      } else {
        setTimeout(() => {
          toast.error("Có lỗi xảy ra!");
        }, 1500);
      }
    },
  });

  const handleReadTicket = async (id: string | number) => {
    try {
      readMutation.mutate(id);
    } catch (error) {
      console.error("Failed to fetch ticket", error);
    }
  };

  // const handleReadTicket = (ticket: Tickets) => {
  //   setTicketToRead(ticket);
  //   setIsFormOpen(true);
  // };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleSearch = (searchTerm: string) => {
    setCurrentPage(1); // Reset to the first page when searching
    const results = fetchedTickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTickets(results);
    setSearchQuery(searchTerm);
  };

  const actionList = ["Read"];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 2,
        }}
      >
        <SearchInputBase onSearch={handleSearch} placehoder="Search Ticket" />
      </Box>
      <TicketList
        tickets={filteredTickets}
        onAction={actionList}
        onRead={handleReadTicket}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        heads={columns}
        totalPages={totalPages}
      />
      <TicketDetail
        open={isFormOpen}
        handleClose={handleFormClose}
        ticketToRead={ticketToRead}
      />
    </Container>
  );
};

export default TicketManagement;
