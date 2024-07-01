import React from 'react';
import LeftMenu from '../LeftMenu/index.tsx';
import ProductList from '../ProductList/index.tsx';
import SearchInputBase from '../Input/Search/index.tsx';
import Box from '@mui/material/Box';
import { useState, useContext } from 'react';
import { BookContext } from '../../contexts/Book/index.tsx';

const Content = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('BookManagement must be used within a BookProvider');
}
  const { books } = context;
  const [searchResults, setSearchResults] = useState(books);

  const handleSearchProduct = (searchTerm: string) => {
    const results = books.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
      
    );
    setSearchResults(results);
  };
  return (
    <div style={{display: 'flex', backgroundColor: '#F0FFFF' }}>
      <div style={{ width: '20%', backgroundColor: '#DCDCDC', margin: '20px', borderRadius:'0px 50px 0px 50px' }}>
        <LeftMenu />
      </div>
      <div style={{ width: '80%' }}>
        <Box className='searchinput' style={{ margin:'20px 20px 20px 850px'}}>
          <SearchInputBase placehoder='Search Product' onSearch={handleSearchProduct} />
        </Box>
        <ProductList productList={searchResults} />
      </div>
    </div>
  );
};

export default Content;
