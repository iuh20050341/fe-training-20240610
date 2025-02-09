import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/index.tsx';
import Home from './pages/Home/index.tsx'
import Footer from './pages/Footer/index.tsx';
import BookManagement from './pages/BookManagement/index.tsx';
import ReaderManagement from './pages/ReaderManagement/index.tsx';
import Login from './pages/Login/index.tsx';
import Register from './pages/Register/index.tsx';
import ProductDetail from './pages/ProductDetail/index.tsx';
import TicketManagement from './pages/TicketManagement/index.tsx';
// import BorrowReturnManagement from './pages/BorrowReturnManagement/index.tsx';
// import BorrowManagement from './pages/BorrowManagement/index.tsx';
import BorrowProvider from './contexts/Borrow/index.tsx'; // Import BorrowProvider
import ReturnManagement from './pages/ReturnManagement/index.tsx';
import BookProvider from './contexts/Book/index.tsx';
import AccountProvider from './contexts/Account/index.tsx';
import ReturnListProvider from './contexts/ReturnedList/index.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './pages/UserProfile/ProfileDetails/index.tsx';
import ChatBotIcon from './components/Chatbot/index.tsx'
import TicketProvider from './contexts/Ticket/index.tsx';

// import { useEffect, useState } from 'react';
// import productApi from './api/productApi.ts';
function App() {
  // const [datas, setDatas] = useState([])
  // useEffect(()=>{
  //   const fetchProducts = async () => {
  //     const productList = await productApi.getAll();
  //     setDatas(productList)
  //     console.log('data',productList);
  //   }
  //   fetchProducts()
  // },[]);
  // console.log('Data real',datas);

  return (
    <div className="app-container">
      <AccountProvider>
      <ToastContainer />
      <Router>

        <Header />
        <main className="content">
          <TicketProvider>
            <BookProvider>
              <ReturnListProvider>
                <BorrowProvider>
                  <Routes>
          =            <Route exact path="/" element={<Home />} />
                        <Route path="/books" element={<BookManagement/>} />
                        <Route path="/readers" element={<ReaderManagement />} />
                        <Route path="/tickets" element={<TicketManagement />} />
                        {/* <Route path="/borrow" element={<BorrowManagement/>} /> */}
                        <Route path="/return" element={<ReturnManagement/>} />
                        {/* <Route path="/borrow-return" element={<BorrowReturnManagement />} /> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/product/:productId" element={<ProductDetail/>} />
                        <Route path="/profile" element={<UserProfile />} />
                  </Routes>
                  </BorrowProvider>
                </ReturnListProvider>
              </BookProvider>
              </TicketProvider>
        </main>
          <Footer />
      </Router>
      </AccountProvider>
      <div style={{maxWidth:"300px"}}>
      <ChatBotIcon />
      </div>
    </div>
  );
}

export default App;
