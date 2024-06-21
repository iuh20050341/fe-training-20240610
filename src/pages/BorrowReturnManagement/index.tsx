import React, { useState } from 'react';
import { Typography, Button, TextField, FormControl, InputLabel } from '@mui/material';
import '../../css/BorrowReturnManagement.css';
import BorrowReturnManagementList from './BorrowReturnManagementList/index.tsx';
import BasicSelect from '../../components/Select/index.tsx';
const BorrowReturnManagement = ({bookList}) => {
  const borrowReturnList = [
    {
      "id": 1,
      "borrower": "John Doe",
      "book": "The Great Gatsby",
      "returnDate": "2024-06-15"
    },
    {
      "id": 2,
      "borrower": "Jane Smith",
      "book": "To Kill a Mockingbird",
      "returnDate": "2024-06-20"
    },
    {
      "id": 3,
      "borrower": "Alice Johnson",
      "book": "1984",
      "returnDate": "2024-06-25"
    }
  ]
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'borrower', headerName: 'Borrower' },
    { field: 'book', headerName: 'Book' },
    { field: 'returnDate', headerName: 'ReturnDate' },
  ];
  const actionList =[
    'Return'
  ]

  const [borrowedBooks, setBorrowedBooks] = useState(borrowReturnList);
  const [newBorrower, setNewBorrower] = useState('');
  const [newBook, setNewBook] = useState('');
  const [newReturnDate, setNewReturnDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);



  const handleBorrowBook = () => {
    if (newBorrower && newBook && newReturnDate) {
        const maxId = borrowedBooks.length > 0 ? Math.max(...borrowedBooks.map(book => book.id)) : 0;
        const newEntry = {
        id: maxId + 1,
        borrower: newBorrower,
        book: newBook,
        returnDate: newReturnDate
      };
      setBorrowedBooks([
        ...borrowedBooks,
        newEntry,
      ]);
      setNewBorrower('');
      setNewBook('');
      setNewReturnDate('');
    }
  };

  const handleReturnBook = (id) => {
    const updatedBooks = borrowedBooks.filter(book => book.id !== id);
    setBorrowedBooks(updatedBooks);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    const filteredBooksBySearch = borrowReturnList.filter(
      (book) => book.borrower.toLowerCase().includes(searchQuery.toLowerCase()) || 
                book.book.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBorrowedBooks(filteredBooksBySearch);
  };

  const handleFilter = () => {
    const filteredBooks = borrowReturnList.filter(book => {
      const returnDate = new Date(book.returnDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return returnDate >= start && returnDate <= end;
    });
    setBorrowedBooks(filteredBooks);
  };
  const handleSelect = (e) => {
    setNewBook(e.target.value);

  };
  return (
    <div className="borrow-return-container">
      <Typography variant="h4" gutterBottom>
        Borrow/Return Management
      </Typography>
      <div className="borrow-inputs">
        <TextField
          label="Borrower"
          value={newBorrower}
          onChange={(e) => setNewBorrower(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <FormControl style={{ marginRight: '10px', minWidth: 120 }}>
          <InputLabel id="book-select-label">Book</InputLabel>
          <BasicSelect
           label={'book-select'}
           id={'book-select'}
           value={newBook}
           action={handleSelect}
           data={bookList}
          />
        </FormControl>
        <TextField
          type="date"
          label="Return Date"
          InputLabelProps={{ shrink: true }}
          value={newReturnDate}
          onChange={(e) => setNewReturnDate(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleBorrowBook}>
          Borrow Book
        </Button>
          <div className="filter-inputs" style={{marginLeft:'20px'}}>
          <TextField
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <TextField
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleFilter}>
            Filter
          </Button>
          <TextField
            label="Search by Borrower or Book"
            value={searchQuery}
            onChange={handleSearch}
            style={{ marginLeft: '10px' }}
          />
        </div>
      </div>
      
      <div className="borrow-list">
            <BorrowReturnManagementList datas ={borrowedBooks} heads={columns} onReturn={handleReturnBook} currentPage={currentPage} setCurrentPage={setCurrentPage} onAction={actionList} />
      </div>
    </div>
  );
};

export default BorrowReturnManagement;
