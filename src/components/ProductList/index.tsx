import React from 'react';
import BoxProduct from '../BoxProduct/index.tsx';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  image: string;
}

interface ProductListProps {
  productList: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {productList.map(product => (
        <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <BoxProduct
            key={product.id}
            name={product.name}
            image={product.image}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
