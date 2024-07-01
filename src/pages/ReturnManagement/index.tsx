import React from 'react';
import Table from '../../components/Table/index.tsx';
import { useContext, useState, useEffect, useCallback } from 'react';
import { BorrowContext } from '../../contexts/Borrow/index.tsx';
import { Typography, Button, TextField } from '@mui/material';
import { BookContext } from '../../contexts/Book/index.tsx';
import { ReturnListContext } from '../../contexts/ReturnedList/index.tsx';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';
import { TicketContext, TicketContextType } from '../../contexts/Ticket/index.tsx';
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
    const contextAccount = useContext(AccountContext) as AccountContextType;
    if (!contextAccount) {
    throw new Error('Errors');
    }
    const contextTicket = useContext(TicketContext) as TicketContextType;
    if (!contextTicket) {
      throw new Error('ERROR!');
    }
    const { tickets, setTickets} = contextTicket;
    const { borrowedBooks, setBorrowedBooks } = context;
    const { books, setBooks } = contextBook;
    const { loggedID } = contextAccount;
    const [returnList, setReturnList] = useState(borrowedBooks.filter(book => book.idUser === loggedID));
    const [currentPage, setCurrentPage] = useState(1);
    const { returnLists, setReturnLists } = contextReturn;
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'borrower', headerName: 'Borrower' },
        { field: 'book', headerName: 'Book' },
        { field: 'price', headerName: 'Price' },      
        { field: 'quantity', headerName: 'Quantity' },      
        { field: 'borrowDate', headerName: 'BorrowDate' },      
        { field: 'totalPrice', headerName: 'TotalPriceNow' }      

      ];
      
      const actionList =[
        'Return'
      ]
      console.log(loggedID);
      const handleReturnBook = (id, bookName, borrower, quantity, price, borrowDate) => {
        setIsButtonDisabled(true);
        const toDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
        const updatedBooks = borrowedBooks.filter(book => book.id !== id);
        const updateTickets = tickets.map(ticket => {
          if(ticket.borrowID === id){
            return { ...ticket, returnDate: toDate, status: true}
          }
          return  ticket;
        })
        const updatedQuantityBooks = books.map(book => {
          if (book.name === bookName) {
              return { ...book, quantity: book.quantity + quantity };
          }
          return book;
        })
        const maxId = returnLists.length > 0 ? Math.max(...returnLists.map(book => book.id)) : 0;
          const newEntry = {
            id: maxId + 1,
            idUser: Number(loggedID),
            borrower: borrower,
            quantity: quantity,
            price: price,
            book: bookName,
            borrowDate: borrowDate,
            returnDate: toDate
          };
        setBorrowedBooks(updatedBooks);
        setBooks(updatedQuantityBooks);
        setTickets(updateTickets)
        setReturnLists([
          ...returnLists,
          newEntry,
        ]);
        setTimeout(() => {
          toast.success('Trả sách thành công')
          setIsButtonDisabled(false);
        }, 2000);
      };
      const handleFilter = useCallback(() => {
        if ((startDate && !endDate) || (!startDate && endDate)) {
          setTimeout(() => {
            toast.error('Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc!')
          }, 1000);          
          return;
        }
        if (!startDate && !endDate && !searchQuery){
          setTimeout(() => {
            toast.error('Vui lòng nhập đầy đủ thông tin tìm kiếm!')
          }, 1000);          
          return;
        }
          const filteredBooks = returnList.filter(book => {
          const borrowDate = new Date(book.borrowDate);
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;
          const search = searchQuery.toLowerCase();

          const matchesSearch = search ? book.borrower.toLowerCase().includes(search) || book.book.toLowerCase().includes(search) : true;
          const matchesDateRange = (!start || borrowDate >= start) && (!end || borrowDate <= end);
    
          return matchesSearch && matchesDateRange;
        });
    
        setReturnList(filteredBooks);
      }, [returnList, searchQuery, startDate, endDate]);

      useEffect(() => {
          setReturnList(borrowedBooks.filter(book => book.idUser === loggedID))
      },[borrowedBooks, loggedID])

      const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setSearchQuery('');
        setReturnList(borrowedBooks.filter(book => book.idUser === loggedID))
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
            <CustomizedDialogs button='Returned List' title='Returned List' action='' handleSave={() =>{}} content={<ReturnedList />} />
          </div>
        </div>
        <Table  isButtonDisabled={isButtonDisabled} columns={columns} data={returnList} onEdit={''} onDelete={''} onRead={''} onReturn={handleReturnBook} onAction={actionList} currentPage={currentPage} setCurrentPage={setCurrentPage}  />
    </div>
);
};

export default ReturnManagementList;
