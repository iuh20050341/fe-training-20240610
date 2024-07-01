// LeftMenu.tsx
import React, { useContext } from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { BookContext, BookContextType } from '../../contexts/Book/index.tsx';
import { Link } from 'react-router-dom';

const LeftMenu: React.FC = () => {
  const context = useContext(BookContext) as BookContextType;

  if (!context) {
    throw new Error('LeftMenu must be used within a BookProvider');
  }

  const { books } = context;

  // Sort books by borrow count in descending order and get top 5
  const topBorrowedBooks = books.slice().sort((a, b) => b.amountBorrow - a.amountBorrow).slice(0, 5);

  return (
    <Box sx={{ width: '250px', padding: '20px' }}>
      <Typography variant="h6" gutterBottom sx={{textAlign:"center"}}>
        Top 5 most borrowed books
      </Typography>
      <List>
        {topBorrowedBooks.map((book) => (
          <Link key={book.id} to={`/product/${book.id}`} style={{ textDecoration: 'none' }}>
            <ListItem key={book.id}>
              <ListItemAvatar>
                <Avatar sx={{height:80, width:50}} src={book.image} alt={book.name} variant="rounded" />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography sx={{ color: 'black' }}>{book.name}</Typography>}
                secondary={`Borrowed: ${book.amountBorrow} times`}
              />
            </ListItem>
          </Link>

        ))}
      </List>
    </Box>
  );
};

export default LeftMenu;
