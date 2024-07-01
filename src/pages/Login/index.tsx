import React, { useContext } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginApi from '../../api/loginApi.ts';

function SignupForm() {
  const context = useContext(AccountContext) as AccountContextType;
  if (!context) {
    throw new Error('Errors');
  }
  const { accounts, setIsLoggedIn, setLoggedID, setRulesID } = context;

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const navigate = useNavigate();

  // const onSubmit = (data) => {
  //   const user = accounts.find(account => account.username === data.username && account.password === data.password);
  //   if (user) {
  //     setIsLoggedIn(true);
  //     setLoggedID(user.id);
  //     setTimeout(() => {
  //       navigate('/'); 
  //       toast.success('Đăng nhập thành công');
  //     }, 1500);
  //   } else {
  //     toast.error('Tên đăng nhập hoặc mật khẩu không đúng');
  //   }
  //   console.log('Form Data:', data);
  // };
  const onSubmit = async (data) => {
    try {
      const response = await loginApi.add(data.username, data.password);
      if (response) {
        console.log('Login',response);

      const token = response.data.data.access_token;
      console.log('Tokennnnn',token);
      
      localStorage.setItem('token', token); // Lưu token vào localStorage
      setIsLoggedIn(true);
      setLoggedID(response.data.data.user.id)
      setRulesID(response.data.data.user.role.id)      
      setTimeout(() => {
        navigate('/');
        toast.success('Đăng nhập thành công');
        }, 1500);
      } else {
        toast.error('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      toast.error('Error');
    }
    console.log('Form Data:', data);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField 
              id="username" 
              label="Username" 
              variant="outlined" 
              {...register('username', { required: 'Username is required' })} 
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ''}
            />
            <TextField 
              id="password" 
              type="password" 
              label="Password" 
              variant="outlined" 
              {...register('password', { required: 'Password is required' })} 
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
          <Link to="/register" style={{ textDecoration: 'none', color: '#3f51b5' }}>Register</Link>
          <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#3f51b5' }}>Forgot Password</Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignupForm;
