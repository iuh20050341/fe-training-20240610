import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

export interface Book {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  author: string;
  publish: number;
  quantity: number;
  price: number;
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
        "name": "Cây Cam Ngọt Của Tôi",
        "description": "Mở đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu thiếu đi lòng yêu thương và niềm trắc ẩn. Cuốn sách kinh điển này bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil.",
        "image": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_217480.jpg",
        "category": "Electronics",
        "rating": 3,
        "author": "José Mauro de Vasconcelos",
        "publish": 2016,
        "quantity": 20,
        "price": 2000,
        "amountBorrow": 5
      },
      {
        "id": 2,
        "name": "Hiểu Về Trái Tim (Tái Bản 2023)",
        "description": "Là tác phẩm đầu tay của nhà sư Minh Niệm, người sáng lập dòng thiền hiểu biết (Understanding Meditation), kết hợp giữa tư tưởng Phật giáo Đại thừa và Thiền nguyên thủy Vipassana, nhưng Hiểu Về Trái Tim không phải tác phẩm thuyết giáo về Phật pháp. Cuốn sách rất “đời” với những ưu tư của một người tu nhìn về cõi thế. Ở đó, có hạnh phúc, có đau khổ, có tình yêu, có cô đơn, có tuyệt vọng, có lười biếng, có yếu đuối, có buông xả… Nhưng, tất cả những hỉ nộ ái ố ấy đều được khoác lên tấm áo mới, một tấm áo tinh khiết và xuyên suốt, khiến người đọc khi nhìn vào, đều thấy mọi sự như nhẹ nhàng hơn…",
        "image": "https://cdn0.fahasa.com/media/catalog/product/z/4/z4118763446785_cf4bc22d353b065bbb37e686de1f9207.jpg",
        "category":"Minh Niệm",
        "rating": 4.2,
        "author": "DJI",
        "publish": 2016,
        "quantity": 10,
        "price": 2500,
        "amountBorrow": 8
      },
      {
        "id": 3,
        "name": "Cristiano Ronaldo - All About Him",
        "description": "Câu chuyện về cuộc đời đầy thú vị của một cậu bé lớn lên từ đường phố Madeira, rồi trở thành một trong những cầu thủ bóng đá vĩ đại nhất của bóng đá thế kỷ 21. Một câu chuyện chân thành và ngạc nhiên về hành trình đến vinh quang của CR7.",
        "image": "https://cdn0.fahasa.com/media/catalog/product/r/o/ronaldo.jpg",
        "category":"Accessories",
        "rating": 4.8,
        "author": "Mchael Part",
        "publish": 2016,
        "quantity": 29,
        "price": 3900,
        "amountBorrow": 77
      },
      {
        "id": 4,
        "name": "Messi Vs Ronaldo - Đại Chiến Giữa Những Vị Thần (Tái Bản 2024)",
        "description": "Messi vs Ronaldo - Ai là người xuất sắc hơn? Đấy không phải là câu hỏi mà cuốn sách này cố gắng trả lời. Nhưng thông qua cuốn sách này, các bạn sẽ có được tất cả những gì các bạn cần phải biết về hai siêu sao bóng đá đương đại, để từ đó có thể tự mình đưa ra quyết định",
        "image": "https://cdn0.fahasa.com/media/catalog/product/9/7/9786044402338.jpg",
        "category": "Electronics",
        "rating": 4.6,
        "author": "Luca Caioli",
        "publish": 2016,
        "quantity": 23,
        "price": 2000,
        "amountBorrow": 15
      },
      {
        "id": 5,
        "name": "Practicing The Power Of Now",
        "description": "Practice The Power of Now: If you, like many others, have benefited from the transformative experience of reading The Power of Now, you will want to own and read Practicing the Power of Now.",
        "image": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935086855263.jpg",
        "category":"Smartphones",
        "rating": 4,
        "author": "Eckhart Tolle",
        "publish": 2016,
        "quantity": 27,
        "price": 1000,
        "amountBorrow": 7
      },
      {
        "id": 6,
        "name": "Toeic Bridge Test",
        "description": "TOEIC Bridge Test là kỳ thi đánh giá trình độ Anh ngữ được thiết kế cho những chương trình học dành cho những học viên tiếng Anh ở trình độ sơ cấp và trung cấp. Kỳ thi nhằm mục đích lấy kết quả để xếp lớp ở những khóa học ngôn ngữ cũng như đánh giá kết quả học tập sau khi hoàn thành khóa học. Bộ tài liệu mới này được thiết kế đặc biệt dành cho những đối tượng học viên đó. ",
        "image": "https://cdn0.fahasa.com/media/catalog/product/u/n/untitled_2_8.jpg",
        "category":"Accessories",
        "rating": 4.9,
        "author": "Barrons Educational Series",
        "publish": 2016,
        "quantity": 39,
        "price": 1800,
        "amountBorrow": 19
      },
      {
        "id": 7,
        "name": "Yes Or No - Những Quyết Định Thay Đổi Cuộc Sống",
        "description": "Trong cuộc sống, không ít lần bạn phải đứng trước sự lựa chọn khó khăn khi phải quyết định một vấn đề nào đó. Có lúc bạn chỉ dựa theo Cảm tính của mình, nhưng có những quyết định quan trọng mà bạn cần phải suy nghĩ và cân nhắc...",
        "image": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935086855706.jpg",
        "category":"Spencer Johnson",
        "rating": 4.3,
        "author": "Anker",
        "publish": 2016,
        "quantity": 8,
        "price": 2500,
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
