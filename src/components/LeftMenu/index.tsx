// LeftMenu.tsx
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Books } from "../../types/book.type.ts";
import productApi from "../../api/productApi.ts";

const LeftMenu: React.FC = () => {
  const { data: fetchedBooks = [] } = useQuery<Books[], Error>({
    queryKey: ["books"],
    queryFn: async () => {
      try {
        const response = await productApi.getAll();
        return response.data.data.result || [];
      } catch (error) {
        throw error;
      }
    },
    retry: false,
  });

  const topBorrowedBooks = fetchedBooks
    .slice()
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <Box sx={{ width: "250px", padding: "20px" }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Top 5 most borrowed books
      </Typography>
      <List>
        {topBorrowedBooks.map((book) => (
          <Link
            key={book.id}
            to={`/product/${book.id}`}
            style={{ textDecoration: "none" }}
          >
            <ListItem key={book.id}>
              <ListItemAvatar>
                <Avatar
                  sx={{ height: 80, width: 50 }}
                  src={`data:image/png;base64,${book.imgBase64}`}
                  alt={book.title}
                  variant="rounded"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ color: "black" }}>{book.title}</Typography>
                }
                secondary={`Borrowed: ${book.amount} times`}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default LeftMenu;
