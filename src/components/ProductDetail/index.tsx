import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import BasicGrid from '../Grid/index.tsx'
import HalfRating from '../Rating/index.tsx';
import { useContext } from 'react';
import { BookContext } from '../../contexts/Book/index.tsx';
import { BorrowContext } from '../../contexts/Borrow/index.tsx';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const { books, setBooks } = context;
    const { borrowedBooks, setBorrowedBooks } = contextBorrow;
    const { loggedID, accounts } = contextAccount;
    const { productId } = useParams();
    const parsedProductId = parseInt(productId as string);

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
        if (product) {
          const maxId = borrowedBooks.length > 0 ? Math.max(...borrowedBooks.map(book => book.id)) : 0;
          const toDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
          const newEntry = {
            id: maxId + 1,
            borrower: userName,
            book: product.name,
            borrowDate: toDate
          };
      
          const updatedBooks = books.map(book => {
            if (book.name === product.name) {
              if (book.quantity > 0) {
                setTimeout(() => {
                  toast.success('Mượn sách thành công')
                }, 1500);
                return { ...book, quantity: book.quantity - 1, amountBorrow: book.amountBorrow + 1 };
              } else {
                setTimeout(() => {
                  toast.error(`Sách ${product.name} đã hết!`)
                }, 1500);
              }
            }
            return book;
          }).filter(book => book !== undefined); // Loại bỏ các giá trị undefined nếu có
      
          setBorrowedBooks([
            ...borrowedBooks,
            newEntry,
          ]);
          setBooks(updatedBooks);
        }
        else{
          toast.error('error!');
          return;
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
                                <Grid item xs={12} md={7} style={{}}>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left'}} >
                                            <b>Category: </b>
                                            {product.category}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left'}}>
                                            <b>Author: </b>
                                            {product.author}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left'}}>
                                            <b>Borrowed: </b>
                                            {product.amountBorrow} times
                                            </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{textAlign:'left', marginTop:'20px'}}>
                                            <HalfRating value={product.rating}/>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left'}} >
                                            <b>Supplier: </b>
                                            {product.category}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="div" style={{textAlign:'left'}}>
                                            <b>Publisher: </b>
                                            {product.author}
                                        </Typography>
                                    </Grid>
                                    {loggedID && (
                                        <Grid item>
                                            <Button variant="contained" color="success" onClick={handleBorrowBook} style={{ minWidth: '150px', marginRight:'253px', marginTop:'20px'}}>
                                                Borrow Book
                                            </Button>
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
