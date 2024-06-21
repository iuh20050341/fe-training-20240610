import React, { useContext } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';

function SignupForm() {
  const context = useContext(AccountContext) as AccountContextType;
  if (!context) {
    throw new Error('Errors');
  }
  const { accounts, setAccounts } = context;

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      phone: ''
    }
  });

  const username = useWatch({ control: control, name: 'username' });
  const navigate = useNavigate();
  console.log({ username });

  const onSubmit = (data) => {
    const userExists = accounts.some(account => account.username === data.username);
    if (userExists) {
      toast.error('Username đã tồn tại');
    } else {
      const newAccountId = accounts.length + 1;
      setAccounts([...accounts, {...data, id: newAccountId}]);
      setTimeout(() => {
        navigate('/login'); 
        toast.success('Tạo tài khoản thành công');
      }, 1500);
      console.log('Form Data:', data);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
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
              id="email" 
              label="Email" 
              type="text" 
              variant="outlined" 
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address'
                } 
              })} 
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <TextField 
              id="phone" 
              label="Phone" 
              type="tel" 
              variant="outlined" 
              {...register('phone', { 
                required: 'Phone is required',
                pattern: {
                  value: /^0\d{9}$/,
                  message: 'Invalid phone number'
                } 
              })} 
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : ''}
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
            <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
              Submit
            </Button>
          </Box>
        </form>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
          <Link to="/login" style={{ textDecoration: 'none', color: '#3f51b5' }}>Login</Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignupForm;
