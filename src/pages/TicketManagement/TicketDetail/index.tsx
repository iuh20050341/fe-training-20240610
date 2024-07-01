import React, { } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { formatCurrency } from '../../../utils/formatCurrency.ts';

const TicketDetail = ({ open, handleClose, ticketToRead }) => {
  if (!ticketToRead) {
    return null;
  }
  const borrowDate = Number(new Date(ticketToRead.borrowDate));
  const returnDate = Number(new Date(ticketToRead.returnDate))
  const differenceMs = returnDate - borrowDate;
  let differenceDays = 0
  if(differenceMs > 0){
    differenceDays = (returnDate - borrowDate) / (1000 * 60 * 60 * 24);
  }else{
    differenceDays = 1
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ticket Detail</DialogTitle>
      <DialogContent sx={{ width: '400px' }}>
      <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 4, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Thông tin chi tiết vé mượn
      </Typography>
      <Typography variant="body1">
        <strong>Tên người mượn:</strong> {ticketToRead.username}
      </Typography>
      <Typography variant="body1">
        <strong>Tên sách:</strong> {ticketToRead.bookname}
      </Typography>
      <Typography variant="body1">
        <strong>Giá:</strong> {formatCurrency(ticketToRead.price)} / 1 day
      </Typography>
      <Typography variant="body1">
        <strong>Số lượng:</strong> {ticketToRead.quantity}
      </Typography>
      <Typography variant="body1">
        <strong>Ngày mượn:</strong> {ticketToRead.borrowDate}
      </Typography>
      <Typography variant="body1">
        <strong>Ngày trả:</strong> {ticketToRead.returnDate}
      </Typography>
      <Typography variant="body1">
        <strong>Tổng tiền:</strong> {ticketToRead.status === true ? (formatCurrency(ticketToRead.price*ticketToRead.quantity*differenceDays)) : ('Chờ thanh toán')}
      </Typography>
      <Typography variant="body1">
        <strong>Trạng thái:</strong> {ticketToRead.status === true ? (
              <b style={{ color: 'green' }}>Đã trả</b>
            ) : (
              <b style={{ color: 'red' }}>Đang mượn</b>
            )}
      </Typography>
    </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDetail;
