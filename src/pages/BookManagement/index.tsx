import React, { useState, useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import BookForm from "./BookForm/index.tsx";
import BookList from "./BookList/index.tsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInputBase from "../../components/Input/Search/index.tsx";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import productApi from "../../api/productApi.ts";
import { Book, Books } from "../../types/book.type.ts";
import axios from "axios";
export type FormStateType = Omit<
  Books,
  "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy"
>;
const BookManagement = () => {
  const queryClient = new QueryClient();

  const [fetchError, setFetchError] = useState(false);

  // const { data: fetchedBooksID = [] } = useQuery<Books[], Error>({
  //   queryKey: ['booksID'],
  //   queryFn: async () => {
  //     try {
  //       const response = await productApi.get(61);
  //       return response.data.data || [];
  //     } catch (error) {
  //       setFetchError(true);
  //       throw error;
  //     }
  //   },
  //   retry: false, // Không retry khi co loi
  // });

  const { data: fetchedBooks = [], refetch } = useQuery<Books[], Error>({
    queryKey: ["books"],
    queryFn: async () => {
      try {
        const response = await productApi.getAll();
        return response.data.data.result || [];
      } catch (error) {
        setFetchError(true);
        throw error;
      }
    },
    retry: false, // Không retry khi co loi
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

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Name" },
    { field: "author", headerName: "Author" },
    { field: "publisher", headerName: "Publish" },
    { field: "price", headerName: "Price" },
    { field: "quantity", headerName: "Quantity" },
    { field: "imgBase64", headerName: "Image" },
  ];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Books | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState(fetchedBooks);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // useEffect(() => {
  //   setFilteredBooks(fetchedBooks.filter(
  //     (book) =>
  //       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       book.author.toLowerCase().includes(searchQuery.toLowerCase())
  //   ));
  // }, [fetchedBooks, searchQuery]);

  useEffect(() => {
    if (fetchError) return;
    if (fetchedBooks && fetchedBooks.length > 0) {
      const filtered = fetchedBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [fetchedBooks, searchQuery, fetchError]);

  const handleFormOpen = () => {
    setBookToEdit(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const updateBookMutation = useMutation({
    mutationFn: ({ data }: { data }) => productApi.update(data),
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Cập nhật thành công");
      refetch();
      // setFilteredAccounts(prevAccounts => prevAccounts.map(account =>
      //   account.id === updatedData.data.id ? { ...account, ...updatedData.data } : account
      // ));
    },
    onError: (error: any) => {
      toast.error(`Cập nhật thất bại: ${error.message}`);
    },
  });

  const addBookMutation = useMutation({
    mutationFn: (book: FormStateType) => productApi.add(book),
    onSuccess: () => {
      toast.success("Add thành công");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      refetch();
    },
  });

  const handleSaveBook = (book) => {
    if (bookToEdit && bookToEdit.id) {
      const updateBook = { ...book, id: bookToEdit.id };
      updateBookMutation.mutate({ data: updateBook });

      // setBooks(books.map((b) => (b.id === bookToEdit.id ? { ...b, ...book } : b))); update book
    } else {
      addBookMutation.mutate(book);

      // const newBookId = books.length + 1;
      // setBooks([...books, { ...book, id: newBookId }]);
    }
    handleFormClose();
  };

  const editBookMutation = useMutation({
    mutationFn: (id: string | number) => productApi.get(id),
    onSuccess: (response) => {
      setBookToEdit(response.data.data);
      setIsFormOpen(true);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        setTimeout(() => {
          if (error.response) {
            toast.error(error.response.data.message);
          }
        }, 1500);
      } else {
        setTimeout(() => {
          toast.error("Có lỗi xảy ra!");
        }, 1500);
      }
    },
  });

  const handleEditBook = async (id: string | number) => {
    try {
      editBookMutation.mutate(id);
    } catch (error) {
      console.error("Failed to fetch book", error);
    }
  };

  const mutationDelete = useMutation({
    mutationFn: (id: number | string) => productApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      refetch();
    },
    onError: () => {
      toast.error("Delete thất bại");
    },
  });

  const handleDeleteBook = (id: number | string) => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1500);
    mutationDelete.mutate(id, {
      onSuccess: () => {
        setTimeout(() => {
          toast.success("Delete thành công");
        }, 1500);
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
    setCurrentPage(1);
    const results = fetchedBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(results);
    setSearchQuery(searchTerm);
  };

  const actionList = ["Delete", "Edit"];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 2,
        }}
      >
        <SearchInputBase onSearch={handleSearch} placehoder="Search Book" />
        <Button variant="contained" color="success" onClick={handleFormOpen}>
          Add Book
        </Button>
      </Box>
      <BookList
        isButtonDisabled={isButtonDisabled}
        books={filteredBooks}
        onDelete={handleDeleteBook}
        onEdit={handleEditBook}
        onAction={actionList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        heads={columns}
      />
      <BookForm
        open={isFormOpen}
        handleClose={handleFormClose}
        onSave={handleSaveBook}
        bookToEdit={bookToEdit}
      />
    </Container>
  );
};

export default BookManagement;
