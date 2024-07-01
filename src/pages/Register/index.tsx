import React, { useContext } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';
import RadioList from "../../components/Input/Radio/radiolist.tsx"
import registerApi from '../../api/registerApi.ts';
import { Register } from '../../types/register.type.ts';

type FormStateType = Omit<Register, 'id' | 'createdAt'> | Register
function SignupForm() {
  const context = useContext(AccountContext) as AccountContextType;
  if (!context) {
    throw new Error('Errors');
  }
  const { accounts, setAccounts } = context;

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormStateType>({
    defaultValues: {
      name: '',
      password: '',
      email: '',
      age: 0,
      gender: '',
      address: '',
    }
  });
  
  const navigate = useNavigate();
  const handleGenderChange = (value: string) => {
    setValue('gender', value);
  };
  const onSubmit = async (data: FormStateType) => {
    try {
      const response = await registerApi.add(data);
      if (response) {
        console.log('Register',response);
        
        setTimeout(() => {
          navigate('/login');
          toast.success('Đăng ký thành công');
        }, 1500);
      } else {
        toast.error('Đăng ký thất bại');
      }
    } catch (error) {
      toast.error('Đăng ký thất bại');
    }
    console.log('Form Data:', data);
    // const userExists = accounts.some(account => account.username === data.username);
    // if (userExists) {
    //   setTimeout(() => {
    //     toast.error('Username đã tồn tại');
    //   }, 1000);
    // } else {
    //   const newAccountId = accounts.length + 1;
    //   setAccounts([...accounts, {...data, id: newAccountId, rules: 0}]);
    //   setTimeout(() => {
    //     navigate('/login'); 
    //     toast.success('Tạo tài khoản thành công');
    //   }, 1500);
    //   console.log('Form Data:', data);
    // }
  };
  const genderList = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' },
  ];  return (
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
              {...register('name', { required: 'Username is required' })} 
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
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
            {/* <TextField 
              id="phone" 
              label="Phone" 
              type="number" 
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
              sx={{
                textAlign: 'center',
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                '& input[type=number]': {
                  '-moz-appearance': 'textfield',
                }
              }}
            /> */}
            <TextField 
              id="age" 
              label="Age" 
              type="number" 
              variant="outlined" 
              {...register('age', {required: 'Age is required'})} 
              error={!!errors.age}
              helperText={errors.age ? errors.age.message : ''}
            />        
            <TextField 
              id="address" 
              label="Address" 
              type="text" 
              variant="outlined" 
              {...register('address', {required: 'Address is required'})} 
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ''}
            />        
            <RadioList label="Gender:" name="gender" items={genderList} onChange={handleGenderChange} />
            <TextField 
              id="password"   
              type="password" 
              label="Password" 
              variant="outlined" 
              {...register('password', 
                { required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                    message: 'Invalid password'
                  } 
                },
              )} 
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
