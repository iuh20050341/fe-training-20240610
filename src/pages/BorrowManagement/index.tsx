import React, { useContext, useState } from 'react';
import { Typography, Button, TextField, FormControl } from '@mui/material';
import '../../css/BorrowReturnManagement.css';
import BasicSelect from '../../components/Select/index.tsx';
import { BorrowContext } from './Context/BorrowContext.tsx';
import { BookContext } from '../BookManagement/Context/BookContext.tsx';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BorrowManagement = () => {

const context = useContext(BorrowContext);
  if (!context) {
    throw new Error('BorrowManagement must be used within a BorrowProvider');
}
const contextBook = useContext(BookContext);
if (!contextBook) {
  throw new Error('No Book');
}
const contextAccount = useContext(AccountContext) as AccountContextType;
if (!contextAccount) {
  throw new Error('Errors');
}
const { loggedID, accounts } = contextAccount;
const { books, setBooks } = contextBook
const { borrowedBooks, setBorrowedBooks } = context;
const [newBook, setNewBook] = useState('');
// const [newReturnDate, setNewReturnDate] = useState('');

const user = accounts.find(account => account.id === loggedID);
const userName = user?.username || ''
const handleBorrowBook = () => {
  if (newBook) {
    const maxId = borrowedBooks.length > 0 ? Math.max(...borrowedBooks.map(book => book.id)) : 0;
    const newEntry = {
      id: maxId + 1,
      borrower: userName,
      book: newBook
    };

    const updatedBooks = books.map(book => {
      if (book.name === newBook) {
        if (book.quantity > 0) {
          setTimeout(() => {
            toast.success('Mượn sách thành công')
          }, 1500);
          return { ...book, quantity: book.quantity - 1, amountBorrow: book.amountBorrow + 1 };
        } else {
          setTimeout(() => {
            toast.error(`Sách ${newBook} đã hết!`)
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
    setNewBook('');
  }
  else{
    toast.error('Vui lòng điền đầy đủ thông tin.');
    return;
  }
};

  const handleSelect = (e) => {
    setNewBook(e.target.value);
  };

  // const getTodayDate = () => {
  //   const today = new Date();
  //   const yyyy = today.getFullYear();
  //   const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
  //   const dd = String(today.getDate()).padStart(2, '0');

  //   return `${yyyy}-${mm}-${dd}`;
  // }
  
  return (
    <div className="borrow-return-container">
      <Typography variant="h4" gutterBottom>
        Borrow Management
      </Typography>
      <div className="borrow-inputs" style={{ display: 'flex', gap: '10px' }}>
        <TextField
            label="Borrower"
            value={user?.username}
            style={{ flex: 1, marginRight: '10px' }}
            disabled
        />
        <FormControl style={{ flex: 1, marginRight: '10px', minWidth: 120 }}>
            <BasicSelect
                label={'Book'}
                id={'book-select'}
                value={newBook}
                action={handleSelect}
                data={books}
            
            />
        </FormControl>
        {/* <TextField
            type="date"
            label="Return Date"
            InputLabelProps={{ shrink: true }}
            value={newReturnDate}
            onChange={(e) => setNewReturnDate(e.target.value)}
            inputProps={{ min: getTodayDate() }}
            style={{ flex: 1, marginRight: '10px' }}
        /> */}
        <Button variant="contained" color="success" onClick={handleBorrowBook} style={{ minWidth: '120px', alignSelf: 'flex-end' }}>
            Borrow Book
        </Button>
        </div>

      </div>
  );
};

export default BorrowManagement;
