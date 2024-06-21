export interface Book {
    id: number
    name: string
    author: string
    price: number
    image: string
  }
  
  export type Books = Pick<Book, 'id' | 'name' | 'author' | 'image'>[]
  