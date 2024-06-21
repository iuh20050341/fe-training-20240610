import React from 'react';
import BoxProduct from '../BoxProduct/index.tsx';
import { Link } from 'react-router-dom';



const ProductList = ({ productList }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
      {productList.map(product => (
        <React.Fragment>
          <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <BoxProduct
              key={product.id}
              name={product.name}
              image={product.image}
              />
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductList;
