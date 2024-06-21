import React from 'react';
import Table from '../../components/Table/index.tsx';
import { useContext, useState, useEffect, useCallback } from 'react';
import { Button, TextField } from '@mui/material';
import { ReturnListContext } from '../../contexts/ReturnedList/index.tsx';
import { BookContext } from '../../contexts/Book/index.tsx';
import 'react-toastify/dist/ReactToastify.css';

const ReturnedList = () => {
    const context = useContext(ReturnListContext);
    if (!context) {
      throw new Error('ReturnManagementList must be used within a BorrowProvider');
    }
    const contextBook = useContext(BookContext);
    if (!contextBook) {
      throw new Error('Error');
  }
    const { returnLists } = context;
    const [returnList, setReturnList] = useState(returnLists);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'borrower', headerName: 'Borrower' },
        { field: 'book', headerName: 'Book' },
        { field: 'returnDate', headerName: 'ReturnDate' }      
      
      ];
      const actionList =[
        ''
      ]
      const handleFilter = useCallback(() => {
        const filteredBooks = returnLists.filter(book => {
          const returnDate = new Date(book.returnDate);
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;
          const search = searchQuery.toLowerCase();
    
          const matchesSearch = search ? book.borrower.toLowerCase().includes(search) || book.book.toLowerCase().includes(search) : true;
          const matchesDateRange = (!start || returnDate >= start) && (!end || returnDate <= end);
    
          return matchesDateRange && matchesSearch;
        });
    
        setReturnList(filteredBooks);
      }, [returnLists, searchQuery, endDate, startDate]);
      
      useEffect(() => {
        setReturnList(returnLists)
      }, [returnLists]);
  return (
    <div>
      <div className="filter-inputs" style={{marginLeft:'20px', marginBottom:'20px'}}>
          <TextField
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{marginRight:'5px'}}
          />
          <TextField
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{}}
          />
          <TextField
            label="Search by Borrower or Book"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{marginTop:'5px'}}
          />
            <Button variant="contained" color="primary" onClick={handleFilter} style={{marginLeft:'10px', marginTop:'10px'}}>
            Filter
          </Button>
        </div>
        <Table columns={columns} data={returnList} onEdit={''} onDelete={''} onReturn={''} onAction={actionList} currentPage={currentPage} setCurrentPage={setCurrentPage}  />
    </div>
);
};

export default ReturnedList;
