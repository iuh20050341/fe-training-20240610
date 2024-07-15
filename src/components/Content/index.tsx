import React, { useEffect } from "react";
import LeftMenu from "../LeftMenu/index.tsx";
import ProductList from "../ProductList/index.tsx";
import SearchInputBase from "../Input/Search/index.tsx";
import Box from "@mui/material/Box";
import { useState, useContext } from "react";
import { BookContext } from "../../contexts/Book/index.tsx";
import { useQuery } from "@tanstack/react-query";
import productApi from "../../api/productApi.ts";
import { Books } from "../../types/book.type.ts";
import Paper from "../Paper/index.tsx";

const Content = () => {
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
    retry: false, // Không retry khi co loi
  });

  const context = useContext(BookContext);
  if (!context) {
    throw new Error("BookManagement must be used within a BookProvider");
  }
  const [searchResults, setSearchResults] = useState<Books[]>(fetchedBooks);

  useEffect(() => {
    setSearchResults(fetchedBooks);
  }, [fetchedBooks]);

  const handleSearchProduct = (searchTerm: string) => {
    const results = fetchedBooks.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#F0FFFF" }}>
      <Paper
        style={{
          backgroundColor: "white",
        }}
      >
        <LeftMenu />
      </Paper>
      {/* <div style={{ width: '20%', backgroundColor: '#DCDCDC', margin: '20px', borderRadius:'0px 50px 0px 50px' }}>
        <LeftMenu />
      </div> */}
      <div style={{ width: "80%", marginLeft: "20px" }}>
        <Box className="searchinput" style={{ margin: "20px 20px 20px 930px" }}>
          <SearchInputBase
            placehoder="Search Product"
            onSearch={handleSearchProduct}
          />
        </Box>
        <ProductList productList={searchResults} />
      </div>
    </div>
  );
};

export default Content;
