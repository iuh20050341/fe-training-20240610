import React from "react";
import Table from "../../components/Table/index.tsx";
import { useContext, useState, useEffect } from "react";
import { Typography, Button, TextField } from "@mui/material";
import {
  AccountContext,
  AccountContextType,
} from "../../contexts/Account/index.tsx";
import { toast } from "react-toastify";
import CustomizedDialogs from "../../components/ModalDialog/index.tsx";
import "react-toastify/dist/ReactToastify.css";
import ReturnedList from "./ReturnedList.tsx";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { TicketReturn, Tickets } from "../../types/ticket.type.ts";
import ticketApi from "../../api/ticketApi.ts";
import axios from "axios";
import totalApi from "../../api/totalPriceApi.ts";
import { useQueryString } from "../../utils/utils.ts";

const queryClient = new QueryClient();
const pageSize = 5;
const ReturnManagementList = () => {
  const contextAccount = useContext(AccountContext) as AccountContextType;
  if (!contextAccount) {
    throw new Error("Errors");
  }
  const [fetchError, setFetchError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [returnList, setReturnList] = useState<Tickets[]>([]);
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
  //   retry: false, // Không retry khi có lỗi
  // });

  const totalPages = Math.ceil(fetchedTickets.length / pageSize);

  const { loggedID } = contextAccount;

  useEffect(() => {
    if (!fetchError) {
      const filteredTickets = fetchedTickets.filter(
        (ticket) => ticket.userId === loggedID && ticket.status === "BORROWING"
      );
      setReturnList(filteredTickets);
    }
  }, [fetchedTickets, loggedID, fetchError]);

  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Borrower" },
    { field: "title", headerName: "Book" },
    { field: "borrowDate", headerName: "BorrowDate" },
  ];

  const actionList = ["Return"];

  const totalPriceMutation = useMutation({
    mutationFn: (id: number | string) => totalApi.total(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ticketdetails"] });
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
    onSettled: (data, error) => {
      console.log("Kết quả:", { data, error });
    },
  });

  const returnTicketMutation = useMutation({
    mutationFn: (ticket: TicketReturn) => ticketApi.update(ticket),
    onSuccess: (response) => {
      setTimeout(() => {
        toast.success("Trả sách thành công!");
      }, 1500);
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      totalPriceMutation.mutate(response.data.id);
      refetch();
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

  const toDate = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD

  const handleReturnBook = (ticket) => {
    const updateTicket: TicketReturn = {
      id: ticket.id,
      returnDate: toDate,
      status: "RETURNED",
    };
    returnTicketMutation.mutate(updateTicket);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setSearchQuery("");
    setReturnList(
      fetchedTickets.filter(
        (ticket) => ticket.userId === loggedID && ticket.status === "BORROWING"
      )
    );
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Return Management
      </Typography>
      <div
        className="filter-inputs"
        style={{ marginLeft: "20px", marginBottom: "20px" }}
      >
        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Search by Borrower or Book"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleReset}
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          Reset
        </Button>
        <div style={{ marginTop: "20px" }}>
          <CustomizedDialogs
            button="Returned List"
            title="Returned List"
            action=""
            handleSave={() => {}}
            content={<ReturnedList />}
          />
        </div>
      </div>
      <Table
        isButtonDisabled={isButtonDisabled}
        columns={columns}
        data={returnList}
        onEdit={""}
        onDelete={""}
        onRead={""}
        onReturn={handleReturnBook}
        onAction={actionList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ReturnManagementList;
