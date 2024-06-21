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
import { useState, useEffect, useCallback } from 'react';

const Table = ({ columns, data, onEdit, onDelete, onReturn, onAction, currentPage, setCurrentPage }) => {
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [currentPageData, setCurrentPageData] = useState([]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChangePage = (page) => {
    setLoading(true)
    setCurrentPage(page);
  };

  const updateCurrentPageData = useCallback(() => {
    const slicedData = data.slice(startIndex, endIndex);
    setCurrentPageData(slicedData);
  }, [data, startIndex, endIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      updateCurrentPageData();
      
    }, 2000); 

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
            <TableCell style={{fontWeight:'bold'}}>Action</TableCell>
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
          {!loading && currentPageData.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
              column.field === 'image' ? (
                <TableCell key={column.field}> <img width={150} src={row[column.field]}alt="" /></TableCell>
              ):(
                <TableCell key={column.field}>{row[column.field]}</TableCell>
              )
              ))}
              <TableCell>
              {onAction.includes('Delete') && (
                <IconButton onClick={() => onEdit(row)}>
                  <EditIcon />
                </IconButton>
              )}
              {onAction.includes('Edit') && (
                <IconButton onClick={() => onDelete(row.id)}>
                  <DeleteIcon />
                </IconButton>
              )}
              {onAction.includes('Return') && (
                <IconButton onClick={() => onReturn(row.id, row.book, row.borrower)}>
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
