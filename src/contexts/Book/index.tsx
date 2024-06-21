import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

export interface Book {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  author: string;
  quantity: number;
  amountBorrow: number;
}

export interface BookContextType {
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
}

export const BookContext = createContext<BookContextType | undefined>(undefined);

const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([
    {
        "id": 1,
        "name": "Wireless Noise-Cancelling Headphones",
        "description": "Premium headphones with active noise-cancellation.",
        "image": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_217480.jpg",
        "category": "Electronics",
        "rating": 3,
        "author": "Sony",
        "quantity": 20,
        "amountBorrow": 5
      },
      {
        "id": 2,
        "name": "Smartphone Camera Gimbal",
        "description": "Stabilize your smartphone videos with this advanced gimbal.",
        "image": "https://cdn0.fahasa.com/media/catalog/product/z/4/z4118763446785_cf4bc22d353b065bbb37e686de1f9207.jpg",
        "category":"Computers",
        "rating": 4.2,
        "author": "DJI",
        "quantity": 10,
        "amountBorrow": 8
      },
      {
        "id": 3,
        "name": "Professional DSLR Camera",
        "description": "Capture stunning photos with this high-end DSLR camera.",
        "image": "https://cdn0.fahasa.com/media/catalog/product/r/o/ronaldo.jpg",
        "category":"Accessories",
        "rating": 4.8,
        "author": "Canon",
        "quantity": 29,
        "amountBorrow": 77
      },
      {
        "id": 4,
        "name": "Ultrabook Laptop Galaxy Pro",
        "description": "Slim and lightweight laptop for productivity on the go.",
        "image": "https://cdn0.fahasa.com/media/catalog/product/9/7/9786044402338.jpg",
        "category": "Electronics",
        "rating": 4.6,
        "author": "Lenovo",
        "quantity": 23,
        "amountBorrow": 15
      },
      {
        "id": 5,
        "name": "Fitness Tracker Watch Ponow",
        "description": "Monitor your health and activity with this smartwatch.",
        "image": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935086855263.jpg",
        "category":"Smartphones",
        "rating": 4,
        "author": "Fitbit",
        "quantity": 27,
        "amountBorrow": 7
      },
      {
        "id": 6,
        "name": "Gaming Console PS Yes Or No",
        "description": "Immerse yourself in gaming with the latest console.",
        "image": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935086855706.jpg",
        "category":"Accessories",
        "rating": 4.9,
        "author": "Sony",
        "quantity": 39,
        "amountBorrow": 19
      },
      {
        "id": 7,
        "name": "Wireless Charging Pad Bridge Test",
        "description": "Charge your devices wirelessly with this sleek charging pad.",
        "image": "https://cdn0.fahasa.com/media/catalog/product/u/n/untitled_2_8.jpg",
        "category":"Smartphones",
        "rating": 4.3,
        "author": "Anker",
        "quantity": 8,
        "amountBorrow": 11
      },
  ]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
