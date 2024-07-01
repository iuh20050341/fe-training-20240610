import React, { useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const ReaderForm = ({ open, handleClose, onSave, readerToEdit }) => {
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: '',
      address: '',
      email: ''
    }
  });

  useEffect(() => {
    if (readerToEdit) {
      setValue('name', readerToEdit.name);
      setValue('address', readerToEdit.address);
      setValue('email', readerToEdit.email);
    } else {
      reset();
    }
  }, [readerToEdit, setValue, reset]);

  const onSubmit = (data) => {
    onSave(data);
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{readerToEdit ? 'Edit Reader' : 'Add Reader'}</DialogTitle>
      <DialogContent sx={{ width: '400px' }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Username is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Username"
                error={!!error}
                helperText={error ? error.message : ''}
                required
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            rules={{
              required: 'Address is required',
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                error={!!error}
                helperText={error ? error.message : ''}
                required
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                error={!!error}
                helperText={error ? error.message : ''}
                required
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          {readerToEdit ? 'Save Changes' : 'Add Reader'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReaderForm;
