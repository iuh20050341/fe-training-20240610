export interface Books {
  id: number,
  title: string,
  author: string,
  publisher: string,
  quantity: number,
  price: number,
  amount: number,
  imgUrl: string,
  imgBase64: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  createBy: string,
  updateBy: string,
  }
  
  export type Book = Pick<Books, 'id' | 'title' | 'author' | 'publisher'| 'price'| 'amount'| 'description'| 'quantity'| 'imgUrl'>[]