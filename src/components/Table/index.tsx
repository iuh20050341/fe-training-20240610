import React from 'react';
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useState, useEffect, useCallback } from 'react';
import { formatCurrency } from '../../utils/formatCurrency.ts';

type RowData = {
  id: number;
  [key: string]: any;
};
const toDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD

const Table = ({ columns, data, onEdit, onDelete, onReturn, onRead, onAction, currentPage, setCurrentPage, isButtonDisabled }) => {
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [currentPageData, setCurrentPageData] = useState<RowData[]>([]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChangePage = (page) => {
    if (page !== currentPage){
      setLoading(true)
      setCurrentPage(page);
    }
  };

  const updateCurrentPageData = useCallback(() => {
    const slicedData = data.slice(startIndex, endIndex);
    setCurrentPageData(slicedData);
    setLoading(false);
  }, [data, startIndex, endIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      updateCurrentPageData();
      
    }, 1500); 

    return () => 
      clearTimeout(timer);
  },  [updateCurrentPageData]);
  
  return (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
                <TableCell style={{fontWeight:'bold'}} key={column.field}>{column.headerName}</TableCell>
            ))}
            {!onAction.includes('') && (<TableCell style={{fontWeight:'bold'}}>Action</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
        {loading &&
          (<TableRow>
            <TableCell colSpan={columns.length + 1}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            </TableCell>
          </TableRow>)}
          {!loading && currentPageData.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length + 1} style={{ textAlign: 'center', fontStyle: 'italic', opacity: 0.6, fontSize: 20 }}>
                No data
              </TableCell>
            </TableRow>
          )}
          {!loading && currentPageData.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (      
              column.field === 'totalPrice' ?(
                <React.Fragment>
                  {(Number( new Date(toDate)) - Number(new Date(row.borrowDate)))/(1000 * 60 * 60 * 24) > 0 ? (<TableCell key={column.field}>{formatCurrency(row.price*row.quantity*((Number( new Date(toDate)) - Number(new Date(row.borrowDate)))/(1000 * 60 * 60 * 24)))} </TableCell>):(
                  <TableCell key={column.field}>{formatCurrency(row.price*row.quantity)} </TableCell>
                  )}
                </React.Fragment>
              ):                        
              column.field === 'price' ?(
                <TableCell key={column.field}>{formatCurrency(row[column.field])} </TableCell>
              ):       
              column.field === 'status' ?(
                <TableCell key={column.field}>{row[column.field] === true ? 'Đã trả' : 'Đang mượn'} </TableCell>
              ):
              column.field === 'imgUrl' ? (
                <TableCell key={column.field}> <img width={150} src={row[column.field]}alt="" /></TableCell>
              ):(
                <TableCell key={column.field}>{row[column.field]}</TableCell>
              )
              ))}
              <TableCell>
              {onAction.includes('Edit') && (
                <IconButton onClick={() => onEdit(row.id)} >
                  <EditIcon />
                </IconButton>
              )}
              {onAction.includes('Read') && (
                <IconButton onClick={() => onRead(row)} >
                  <RemoveRedEyeIcon />
                </IconButton>
              )}
              {onAction.includes('Delete') && (
                <IconButton onClick={() => onDelete(row.id)}>
                  {/* disabled={isButtonDisabled} */}
                  <DeleteIcon />
                </IconButton>
              )}
              {onAction.includes('Return') && (
                <IconButton onClick={() => onReturn(row.id, row.book, row.borrower, row.quantity, row.price, row.borrowDate)} disabled={isButtonDisabled}>
                  <KeyboardReturnIcon />
                </IconButton>
              )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} onClick={() => handleChangePage(index + 1)}>
            {index + 1}
          </Button>
        ))}
      </Box>
    </TableContainer>
  );
};

export default Table;
