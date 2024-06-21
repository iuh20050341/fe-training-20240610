import React from 'react';
import Table from '../../components/Table/index.tsx';
import { useContext, useState, useEffect, useCallback } from 'react';
import { BorrowContext } from '../../contexts/Borrow/index.tsx';
import { Typography, Button, TextField } from '@mui/material';
import { BookContext } from '../../contexts/Book/index.tsx';
import { ReturnListContext } from '../../contexts/ReturnedList/index.tsx';
import { toast } from 'react-toastify';
import CustomizedDialogs from '../../components/ModalDialog/index.tsx'
import 'react-toastify/dist/ReactToastify.css';
import ReturnedList from './ReturnedList.tsx';

const ReturnManagementList = () => {
    const context = useContext(BorrowContext);
    if (!context) {
      throw new Error('ReturnManagementList must be used within a BorrowProvider');
    }
    const contextBook = useContext(BookContext);
      if (!contextBook) {
        throw new Error('Error');
    }
    const contextReturn = useContext(ReturnListContext);
    if (!contextReturn) {
      throw new Error('ReturnManagementList must be used within a BorrowProvider');
    }
    const { borrowedBooks, setBorrowedBooks } = context;
    const { books, setBooks } = contextBook;
    const [returnList, setReturnList] = useState(borrowedBooks);
    const [currentPage, setCurrentPage] = useState(1);
    const { returnLists, setReturnLists } = contextReturn;
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'borrower', headerName: 'Borrower' },
        { field: 'book', headerName: 'Book' },
        { field: 'borrowDate', headerName: 'BorrowDate' }      
      
      ];
      const actionList =[
        'Return'
      ]
      
      const handleReturnBook = (id, bookName, borrower) => {
        const updatedBooks = borrowedBooks.filter(book => book.id !== id);
        const updatedQuantityBooks = books.map(book => {
          if (book.name === bookName) {
              return { ...book, quantity: book.quantity + 1 };
          }
          return book;
        })
        const maxId = returnLists.length > 0 ? Math.max(...returnLists.map(book => book.id)) : 0;
          const toDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
          const newEntry = {
            id: maxId + 1,
            borrower: borrower,
            book: bookName,
            returnDate: toDate
          };
        setBorrowedBooks(updatedBooks);
        setBooks(updatedQuantityBooks);
        setReturnLists([
          ...returnLists,
          newEntry,
        ]);
        setTimeout(() => {
          toast.success('Trả sách thành công')
        }, 1500);
      };
      const handleFilter = useCallback(() => {
        const filteredBooks = borrowedBooks.filter(book => {
          const borrowDate = new Date(book.borrowDate);
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;
          const search = searchQuery.toLowerCase();
    
          const matchesSearch = search ? book.borrower.toLowerCase().includes(search) || book.book.toLowerCase().includes(search) : true;
          const matchesDateRange = (!start || borrowDate >= start) && (!end || borrowDate <= end);
    
          return matchesSearch && matchesDateRange;
        });
    
        setReturnList(filteredBooks);
      }, [borrowedBooks, searchQuery, startDate, endDate]);
      
      useEffect(() => {
        setReturnList(borrowedBooks)
      }, [borrowedBooks]);
      const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setSearchQuery('');
      };
  return (
    <div>
        <Typography variant="h4" gutterBottom>
            Return Management
      </Typography>
      <div className="filter-inputs" style={{marginLeft:'20px', marginBottom:'20px'}}>
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
          <TextField
            label="Search by Borrower or Book"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleFilter} style={{marginLeft:'10px', marginTop:'10px'}}>
            Filter
          </Button>
          <Button variant="contained" color="secondary" onClick={handleReset} style={{marginLeft:'10px', marginTop:'10px'}}>
            Reset
          </Button>
          <div style={{marginTop:'20px'}}>
            <CustomizedDialogs button='Returned List' title='Returned List' content={<ReturnedList />} />
          </div>
        </div>
        <Table columns={columns} data={returnList} onEdit={''} onDelete={''} onReturn={handleReturnBook} onAction={actionList} currentPage={currentPage} setCurrentPage={setCurrentPage}  />
    </div>
);
};

export default ReturnManagementList;
