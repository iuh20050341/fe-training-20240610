import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';
import { useContext, useState, useEffect } from 'react';
import AccountMenu from '../../components/AccountMenu/index.tsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header = () => {
  const context = useContext(AccountContext) as AccountContextType;
  if (!context) {
    throw new Error('Errors');
  }
  const { isLoggedIn, setIsLoggedIn, loggedID, accounts, rulesID } = context;
  const [showButtons, setShowButtons] = useState(false);
  const user = accounts.find(account => account.id === loggedID);
  const userName = user?.name
  const getFirstLetter = (username: string | undefined): string => {
    if (!username) {
      return ''; 
    }
  
    // Trả về ký tự đầu tiên của chuỗi username
    return username.charAt(0);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    else {
      setShowButtons(false);
    }
  }, [isLoggedIn]);
  const handleLogout = () =>{
    setTimeout(() => {
      localStorage.removeItem('token'); // Xóa token từ localStorage
      navigate('/'); 
      setIsLoggedIn(false)
      toast.success('Đăng xuất thành công!');
    }, 1500);
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Library Management System
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {isLoggedIn && showButtons && ( 
            <React.Fragment>
              {rulesID === 4 ? (
                <>
                  <Button color="inherit" component={Link} to="/books">Book Management</Button>
                  <Button color="inherit" component={Link} to="/readers">Reader Management</Button>
                  <Button color="inherit" component={Link} to="/tickets">Ticket Management</Button>
                </>
                 ) : (
                <Button color="inherit" component={Link} to="/return">Return Book</Button>
                )}
              {/* <Button color="inherit" component={Link} to="/borrow">Borrow Book</Button> */}

              <AccountMenu name={getFirstLetter(userName)} logout={handleLogout}/>
            </React.Fragment>
          )}
          {/* <Button color="inherit" component={Link} to="/borrow-return">Borrow/Return</Button> */}
          {/* <Button color="inherit" component={Link} to="/statistics">Statistics</Button> */}
          {!isLoggedIn && 
          (
            <React.Fragment>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </React.Fragment>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
