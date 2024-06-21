import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';
import { useContext, useState, useEffect } from 'react';
import AccountMenu from '../../components/AccountMenu/index.tsx';
const Header = () => {
  const context = useContext(AccountContext) as AccountContextType;
  if (!context) {
    throw new Error('Errors');
  }
  const { isLoggedIn, setIsLoggedIn, loggedID, accounts } = context;
  const [showButtons, setShowButtons] = useState(false);
  const user = accounts.find(account => account.id === loggedID);
  const userName = user?.username 
  const getFirstLetter = (username: string | undefined): string => {
    if (!username) {
      return ''; 
    }
  
    // Trả về ký tự đầu tiên của chuỗi username
    return username.charAt(0);
  };
  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
    else {
      setShowButtons(false);
    }
  }, [isLoggedIn]);
  const handleLogout = () =>{
    setIsLoggedIn(false)
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
              <Button color="inherit" component={Link} to="/books">Book Management</Button>
              <Button color="inherit" component={Link} to="/readers">Reader Management</Button>
              {/* <Button color="inherit" component={Link} to="/borrow">Borrow Book</Button> */}
              <Button color="inherit" component={Link} to="/return">Return Book</Button>
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
