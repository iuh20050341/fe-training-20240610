import React, { useContext, useState, useEffect } from 'react';
import { Container, Box, Button } from '@mui/material';
import BookForm from './BookForm/index.tsx';
import BookList from './BookList/index.tsx';
import { BookContext } from '../../contexts/Book/index.tsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchInputBase from '../../components/Input/Search/index.tsx';
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';
import productApi from '../../api/productApi.ts';
import { Books, Book } from '../../types/book.type.ts';
export type FormStateType = Omit<Books, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>
const BookManagement = () => {
  const queryClient = new QueryClient()
  const { data: fetchedBooks = [], refetch } = useQuery<Books[], Error>({
    queryKey: ['books'],
    queryFn: () => productApi.getAll().then(response => response.data.data.result),
  });
  
  // const [datas, setDatas] = useState<Book[]>([])
  // useEffect(()=>{
  //   const fetchProducts = async () => {
  //     const productList = await productApi.getAll();
  //     const result = productList.data.data.result
  //     setDatas(result)
  //   }
  //   fetchProducts()
  // },[]);
  // console.log('Data real',datas);

  const context = useContext(BookContext);
  if (!context) {
    throw new Error('BookManagement must be used within a BookProvider');
}
    const { books, setBooks } = context;
    // const [books, setBooks] = useState(bookList);
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'title', headerName: 'Name' },
        { field: 'author', headerName: 'Author' },
        { field: 'publisher', headerName: 'Publish' },
        { field: 'price', headerName: 'Price' },
        { field: 'quantity', headerName: 'Quantity' },
        { field: 'imgUrl', headerName: 'Image' },

      ];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState(fetchedBooks);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  useEffect(() => {
    setFilteredBooks(fetchedBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [fetchedBooks, searchQuery]);

  const handleFormOpen = () => {
    setBookToEdit(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  const addBookMutation = useMutation({
      mutationFn: (book: FormStateType) => productApi.add(book),
    onSuccess: () =>{
      toast.success('Add thành công');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      refetch();  // Refetch the books after a successful deletion
    }
  }) 
  const handleSaveBook = (book) => {
    if (bookToEdit) {
      setBooks(books.map((b) => (b.id === bookToEdit.id ? { ...b, ...book } : b)));
    } else {
      addBookMutation.mutate(book)
      console.log("Book", book);
      
      // const newBookId = books.length + 1;
      // setBooks([...books, { ...book, id: newBookId }]);
    }
    handleFormClose();    
  };

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setIsFormOpen(true);
  };
  const mutation = useMutation({
    mutationFn: (id: number | string) => productApi.remove(id),
    onSuccess: () => {
      toast.success('Delete thành công');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      refetch();  // Refetch the books after a successful deletion

    },
    onError: () => {
      toast.error('Delete thất bại');
    }
  });

  const handleDeleteBook = (id: number | string) => {
    setIsButtonDisabled(true);
    console.log(id);
    
    mutation.mutate(id, {
      onSuccess: () => {
        setBooks(books.filter((book) => book.id !== id));
        setIsButtonDisabled(false);
      },
    });
  };
  // const handleDeleteBook = (id) => {
  //   setIsButtonDisabled(true);
  //   setBooks(books.filter((book) => book.id !== id));
  //     setTimeout(() => {
  //     setIsButtonDisabled(false);
  //     toast.success('Delete thành công');
  //   }, 1500);
  // };


  const handleSearch = (searchTerm: string) => {
    setCurrentPage(1); // Reset to the first page when searching
    const results = fetchedBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredBooks(results);
    setSearchQuery(searchTerm);
  };
  const actionList = [
    'Delete',
    'Edit'
  ]

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <SearchInputBase onSearch={handleSearch} placehoder='Search Book' />
        <Button variant="contained" color="success" onClick={handleFormOpen}>
          Add Book
        </Button>
      </Box>
      <BookList isButtonDisabled={isButtonDisabled} books={filteredBooks} onDelete={handleDeleteBook} onEdit={handleEditBook} onAction={actionList} currentPage={currentPage} setCurrentPage={setCurrentPage} heads={columns}/>
      <BookForm open={isFormOpen} handleClose={handleFormClose} onSave={handleSaveBook} bookToEdit={bookToEdit} />
    </Container>
  );
};

export default BookManagement;
