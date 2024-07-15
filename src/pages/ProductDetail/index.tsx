import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import { IconButton, TextField, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import BasicGrid from "../../components/Grid/index.tsx";
import { useContext } from "react";
import {
  AccountContext,
  AccountContextType,
} from "../../contexts/Account/index.tsx";
import CustomizedDialogs from "../../components/ModalDialog/index.tsx";
import { formatCurrency } from "../../utils/formatCurrency.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBorrow from "./ConfirmBorrow/index.tsx";
import productApi from "../../api/productApi.ts";
import { Books } from "../../types/book.type.ts";
import { QueryClient, useMutation } from "@tanstack/react-query";
import ticketApi from "../../api/ticketApi.ts";
import { Ticket } from "../../types/ticket.type.ts";
import axios from "axios";
import ticketdetailApi from "../../api/ticketdetailApi.ts";
import { TicketDetail } from "../../types/ticketdetail.type.ts";

const queryClient = new QueryClient();

const ProductDetail = () => {
  const contextAccount = useContext(AccountContext) as AccountContextType;
  if (!contextAccount) {
    throw new Error("Errors");
  }

  const { loggedID, rulesID } = contextAccount;
  const { productId } = useParams();
  const parsedProductId = parseInt(productId as string);
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState<Books | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await productApi.get(parsedProductId);
        setBook(response.data.data);
      } catch (err) {
        setError("Failed to fetch book details");
      }
    };

    fetchBook();
  }, [parsedProductId]);

  const addTicketDetailMutation = useMutation({
    mutationFn: (ticketdetail: TicketDetail) =>
      ticketdetailApi.add(ticketdetail),
    onSuccess: () => {
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

  const addTicketMutation = useMutation({
    mutationFn: (ticket: Ticket) => ticketApi.add(ticket),
    onSuccess: (data) => {
      setTimeout(() => {
        toast.success("Mượn thành công!");
      }, 1500);
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      if (loggedID !== null) {
        const newTicketDetail: TicketDetail = {
          userId: loggedID,
          ticketId: data.data.data.id,
        };
        addTicketDetailMutation.mutate(newTicketDetail);
      } else {
        toast.error("Không xác định được ID người dùng!");
      }
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

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  if (isNaN(parsedProductId) || !book) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  // const addTicketMutation = useMutation({
  //     mutationFn: (ticket) => ticketApi.add(ticket),
  //   onSuccess: () =>{
  //     toast.success('Mượn sách thành công');
  //     queryClient.invalidateQueries({ queryKey: ['tickets'] });
  //     refetch();
  //   }
  // })
  // const getCurrentDateInISOFormat = () => {
  //     const date = new Date();

  //     const pad = (num) => num.toString().padStart(2, '0');
  //     const padMilliseconds = (num) => num.toString().padStart(3, '0');

  //     const year = date.getFullYear();
  //     const month = pad(date.getMonth() + 1);
  //     const day = pad(date.getDate());
  //     const hours = pad(date.getHours());
  //     const minutes = pad(date.getMinutes());
  //     const seconds = pad(date.getSeconds());
  //     const milliseconds = padMilliseconds(date.getMilliseconds());

  //     const offset = -date.getTimezoneOffset();
  //     const offsetSign = offset >= 0 ? '+' : '-';
  //     const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
  //     const offsetMinutes = pad(Math.abs(offset) % 60);

  //     return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
  // };
  // lấy ngày theo định dạng yyyy-MM-dd'T'HH:mm:ss.SSSX
  // const toDate = getCurrentDateInISOFormat();

  const toDate = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD

  const handleBorrowBook = () => {
    if (loggedID) {
      const newTicket: Ticket = {
        bookId: parsedProductId,
        userId: loggedID,
        borrowDate: toDate,
        returnDate: "",
        status: "BORROWING",
        quantity: quantity,
      };
      addTicketMutation.mutate(newTicket);
    }
  };

  return (
    <Card style={{ maxWidth: 1500, margin: "20px auto", display: "flex" }}>
      <BasicGrid
        item1={
          <CardMedia
            component="img"
            height="450"
            image={`data:image/png;base64,${book.imgBase64}`}
            alt={book.title}
            style={{ flex: "1" }}
          />
        }
        item2={
          <CardContent style={{ flex: "2", padding: "20px", height: "410px" }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography
                  variant="h3"
                  component="div"
                  style={{ textAlign: "left" }}
                >
                  {book.title}
                </Typography>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                <Grid item xs={12} md={5} style={{}}>
                  <Grid item>
                    <Typography
                      component="div"
                      style={{ textAlign: "left", marginTop: "20px" }}
                    >
                      <b>Author: </b>
                      {book.author}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="div"
                      style={{ textAlign: "left", marginTop: "20px" }}
                    >
                      <b>Borrowed: </b>
                      {book.amount} times
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Grid item>
                    <Typography
                      component="div"
                      style={{ textAlign: "left", marginTop: "20px" }}
                    >
                      <b>Publisher: </b>
                      {book.publisher}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="div"
                      style={{ textAlign: "left", marginTop: "20px" }}
                    >
                      <b>Price: </b>
                      {formatCurrency(book.price)}/ 1 day
                    </Typography>
                  </Grid>
                  {loggedID && rulesID === 3 && (
                    <Grid item>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{ marginTop: "40px" }}
                      >
                        <IconButton
                          onClick={handleDecrement}
                          disabled={quantity === 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          type="number"
                          value={quantity}
                          onChange={handleInputChange}
                          inputProps={{ min: 1, readOnly: true }}
                          style={{ width: "55px", textAlign: "center" }}
                          sx={{
                            width: "100px",
                            textAlign: "center",
                            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                              {
                                "-webkit-appearance": "none",
                                margin: 0,
                              },
                            "& input[type=number]": {
                              "-moz-appearance": "textfield",
                            },
                          }}
                        />
                        <IconButton
                          onClick={handleIncrement}
                          disabled={quantity === book.quantity}
                        >
                          <AddIcon />
                        </IconButton>
                        <div style={{ marginTop: "20px" }}>
                          <CustomizedDialogs
                            button="Borrow Book"
                            title="Confirm Borrow"
                            action="Save"
                            handleSave={handleBorrowBook}
                            content={
                              <ConfirmBorrow book={book} quantity={quantity} />
                            }
                          />
                        </div>
                        {/* <Button variant="contained" color="success" onClick={handleBorrowBook} style={{ minWidth: '150px',marginLeft:'20px', marginTop:'20px'}}>
                                                    Borrow Book
                                                </Button> */}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        }
        item3={
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ textAlign: "left" }}
          >
            <b>Product Description</b>
            <br />
            {book.description}
          </Typography>
        }
      />
    </Card>
  );
};

export default ProductDetail;
