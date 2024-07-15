import React, { useEffect, useState } from 'react';
import BoxProduct from '../BoxProduct/index.tsx';
import { Link } from 'react-router-dom';
import { Typography, Box, CircularProgress } from '@mui/material';
import { Books } from '../../types/book.type.ts';
import './style.css';

interface ProductListProps {
  productList: Books[];
}

const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productList.length / productsPerPage);

  useEffect(() => {
    setLoading(false);
  }, [currentPage]);
  
  const handlePageChange = (pageNumber: number) => {
    if(pageNumber !== currentPage){
      setLoading(true)
      setTimeout(() => {
        setCurrentPage(pageNumber);
        setLoading(false);
      }, 1000);
    }
  };
  
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {loading &&
          (
          <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="42.3vh">            
            <CircularProgress size={170}/>
          </Box>
        )}
          {!loading && currentProducts.length === 0 && (
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="50vh">            
              <Typography variant="h4" component="div">
                No Data
              </Typography>              
            </Box>
          )}        
        {!loading && currentProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <BoxProduct
              key={product.id}
              name={product.title}
              image={product.imgBase64}
            />
          </Link>
        ))}
      </div>
      <div style={{ marginTop: '100px', textAlign: 'center', marginBottom:'5px'}}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
