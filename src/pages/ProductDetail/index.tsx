import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { IconButton, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams } from 'react-router-dom';
import BasicGrid from '../../components/Grid/index.tsx'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';import { useContext } from 'react';
import { BookContext } from '../../contexts/Book/index.tsx';
import { BorrowContext } from '../../contexts/Borrow/index.tsx';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';
import { TicketContext, TicketContextType } from '../../contexts/Ticket/index.tsx';
import CustomizedDialogs from '../../components/ModalDialog/index.tsx'
import { formatCurrency } from '../../utils/formatCurrency.ts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmBorrow from './ConfirmBorrow/index.tsx';
const ProductDetail = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('BookManagement must be used within a BookProvider');
    }
    const contextBorrow = useContext(BorrowContext);
  if (!contextBorrow) {
    throw new Error('BorrowManagement must be used within a BorrowProvider');
    }
    const contextAccount = useContext(AccountContext) as AccountContextType;
    if (!contextAccount) {
    throw new Error('Errors');
    }
    const contextTicket = useContext(TicketContext) as TicketContextType;
    if (!contextTicket) {
      throw new Error('ERROR!');
    }
    const { tickets, setTickets } = contextTicket;
    const { books, setBooks } = context;
    const { borrowedBooks, setBorrowedBooks } = contextBorrow;
    const { loggedID, accounts, rulesID } = contextAccount;
    const { productId } = useParams();
    const parsedProductId = parseInt(productId as string);
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
        setQuantity(prevQuantity => prevQuantity - 1);
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
    const user = accounts.find(account => account.id === loggedID);
    const userName = user?.username || ''
    if (isNaN(parsedProductId)) {
        return <Typography variant="h6">Product not found</Typography>;
    }

    const product = books.find(p => p.id === parsedProductId);

    if (!product) {
        return <Typography variant="h6">Product not found</Typography>;
    }
    const handleBorrowBook = () => {
        if(quantity === 0)
        {
            setTimeout(() => {
                toast.error('Vui lòng nhập số lượng')
            }, 1500);
        }
        else{
          const maxId = borrowedBooks.length + 1;
          const newIDTicket = tickets.length + 1
          const toDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
          const newEntry = {
            id: maxId,
            idUser: Number(loggedID),
            borrower: userName,
            quantity: quantity,
            book: product.name,
            price: product.price,
            borrowDate: toDate,
          };
          const newTicket = {
            id: newIDTicket,
            borrowID: maxId,
            userID: Number(loggedID),
            bookID: Number(productId),
            username: userName,
            bookname: product.name,
            quantity: quantity,
            price: product.price * quantity,
            borrowDate: toDate,
            returnDate: '',
            status: false,
          };
      
          const updatedBooks = books.map(book => {
            if (book.name === product.name) {
              if (book.quantity >= quantity) {
                setTimeout(() => {
                  toast.success('Mượn sách thành công')
                  setQuantity(1)
                }, 1500);
                setTickets([
                    ...tickets,
                    newTicket,
                  ]);
                  setBorrowedBooks([
                    ...borrowedBooks,
                    newEntry,
                  ]);
                return { ...book, quantity: book.quantity - quantity, amountBorrow: book.amountBorrow + 1 };
              } else {
                setTimeout(() => {
                  toast.error(`Sách ${product.name} không đủ số lượng!`)
                }, 1500);
              }
            }
            return book;
          }).filter(book => book !== undefined); // Loại bỏ các giá trị undefined nếu có
      
          setBooks(updatedBooks);
        }
      };

    return (
        <Card style={{ maxWidth: 1500, margin: '20px auto', display: 'flex' }}>
            <BasicGrid 
                item1 = {<CardMedia
                    component="img"
                    height="450"
                    image={product.image}
                    alt={product.name}
                    style={{ flex: '1' }}
                />}
                item2 = {
                    <CardContent style={{ flex: '2', padding: '20px', height:'410px'}}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Typography variant="h3" component="div" style={{textAlign:'left'}}>
                                    {product.name}
                                </Typography>
                            </Grid>
                            <Grid container spacing={2} sx={{marginTop:'20px'}}>
                                <Grid item xs={12} md={5} style={{}}>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left', marginTop:'20px'}} >
                                            <b>Category: </b>
                                            {product.category}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left', marginTop:'20px'}}>
                                            <b>Author: </b>
                                            {product.author}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left', marginTop:'20px'}}>
                                            <b>Borrowed: </b>
                                            {product.amountBorrow} times
                                            </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{textAlign:'left', marginTop:'20px'}}>
                                            <Stack spacing={1}>
                                                <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
                                            </Stack>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left', marginTop:'20px'}} >
                                            <b>Supplier: </b>
                                            {product.category}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left', marginTop:'20px'}}>
                                            <b>Publish Year: </b>
                                            {product.publish}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left', marginTop:'20px'}}>
                                            <b>Price: </b>
                                            {formatCurrency(product.price)}/ 1 day
                                        </Typography>
                                    </Grid>
                                    {loggedID && rulesID === 3  &&(
                                        <Grid item>
                                            <Box display="flex" alignItems="center" sx={{marginTop:'40px'}}>
                                                <IconButton onClick={handleDecrement} disabled={quantity === 1}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <TextField
                                                    type="number"
                                                    value={quantity}
                                                    onChange={handleInputChange}
                                                    inputProps={{ min: 1 }}
                                                    style={{width: '55px', textAlign: 'center'}}
                                                    sx={{
                                                        width: '100px',
                                                        textAlign: 'center',
                                                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                                          '-webkit-appearance': 'none',
                                                          margin: 0,
                                                        },
                                                        '& input[type=number]': {
                                                          '-moz-appearance': 'textfield',
                                                        }
                                                      }}
                                                />
                                                <IconButton onClick={handleIncrement}>
                                                    <AddIcon />
                                                </IconButton>
                                                <div style={{marginTop:'20px'}}>
                                                    <CustomizedDialogs 
                                                    button='Borrow Book' 
                                                    title='Confirm Borrow' 
                                                    action='Save' 
                                                    handleSave={handleBorrowBook} 
                                                    content={<ConfirmBorrow book={product} quantity={quantity} />} />
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
                item3 = {
                    <Typography variant="body1" color="text.secondary" style={{textAlign:'left'}}>
                        <b>Product Description</b><br />
                        {product.description}
                    </Typography>
                }
            />

        </Card>
    );
};

export default ProductDetail;
