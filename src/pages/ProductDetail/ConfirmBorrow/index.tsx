import React from 'react';
import { Box, Typography, DialogContent } from '@mui/material';
import { formatCurrency } from '../../../utils/formatCurrency.ts';

const ConfirmBorrow = ({ book, quantity }) => {
  const toDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
  return (
    <React.Fragment>
      <DialogContent sx={{ width: '400px' }}>
      <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 4, maxWidth: 400 }}>
      <Typography variant="body1">
        <strong>Tên sách:</strong> {book.name}
      </Typography>
      <Typography variant="body1">
        <strong>Giá:</strong> {formatCurrency(book.price)}
      </Typography>
      <Typography variant="body1">
        <strong>Số lượng mượn:</strong> {quantity}
      </Typography>
      <Typography variant="body1">
        <strong>Tổng tiền:</strong> {formatCurrency(book.price * quantity)}/ 1 day
      </Typography>
      <Typography variant="body1">
        <strong>Ngày mượn:</strong> {toDate}
      </Typography>
    </Box>
      </DialogContent>
    </React.Fragment>
  );
};

export default ConfirmBorrow;
