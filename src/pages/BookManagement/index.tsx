import React, { useContext, useState, useEffect } from 'react';
import { Container, Box, Button, TextField } from '@mui/material';
import BookForm from './BookForm/index.tsx';
import BookList from './BookList/index.tsx';
import { BookContext } from '../../contexts/Book/index.tsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookManagement = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('BookManagement must be used within a BookProvider');
}
    const { books, setBooks } = context;
    // const [books, setBooks] = useState(bookList);
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'author', headerName: 'Author' },
        { field: 'quantity', headerName: 'Quantity' },
        { field: 'image', headerName: 'Image' },

      ];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState(books);


  useEffect(() => {
    setFilteredBooks(books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [books, searchQuery]);

  const handleFormOpen = () => {
    setBookToEdit(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleSaveBook = (book) => {
    if (bookToEdit) {
      setBooks(books.map((b) => (b.id === bookToEdit.id ? { ...b, ...book } : b)));
    } else {
      const newBookId = books.length + 1;
      setBooks([...books, { ...book, id: newBookId }]);
    }
    handleFormClose();    
  };

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setIsFormOpen(true);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
        setTimeout(() => {
      toast.success('Delete thành công');
    }, 1500);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when searching
    setFilteredBooks(books.filter(
      (book) => book.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                book.author.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };
  const actionList = [
    'Delete',
    'Edit'
  ]

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <TextField
          label="Search by name or author"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          variant="outlined"
        />
        <Button style={{left:'-333px'}} variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="contained" color="success" onClick={handleFormOpen}>
          Add Book
        </Button>
      </Box>
      <BookList books={filteredBooks} onDelete={handleDeleteBook} onEdit={handleEditBook} onAction={actionList} currentPage={currentPage} setCurrentPage={setCurrentPage} heads={columns}/>
      <BookForm open={isFormOpen} handleClose={handleFormClose} onSave={handleSaveBook} bookToEdit={bookToEdit} />
    </Container>
  );
};

export default BookManagement;
