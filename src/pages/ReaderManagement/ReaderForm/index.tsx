import React, { useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import RadioList from "../../../components/Input/Radio/radiolist.tsx";

const ReaderForm = ({ open, handleClose, onSave, readerToEdit }) => {
  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      address: '',
      gender:'',
      age: 0,
    }
  });

  useEffect(() => {
    if (readerToEdit) {
      setValue('name', readerToEdit.name);
      setValue('address', readerToEdit.address);
      setValue('gender', readerToEdit.gender);
      setValue('age', readerToEdit.age.toString()); // Chuyển đổi age thành chuỗi để phù hợp với validation
    } else {
      reset();
    }
  }, [readerToEdit, setValue, reset]);

  const onSubmit = (data) => {
    onSave(data);
    reset();
    handleClose();
  };

  const genderList = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' },
  ];  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{readerToEdit ? 'Edit Reader' : 'Add Reader'}</DialogTitle>
      <DialogContent sx={{ width: '400px' }}>
        <Box component="form" sx={{ marginTop:'10px', display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit(onSubmit)}>
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
            name="age"
            control={control}
            rules={{
              required: 'Age is required',
              pattern: {
                value: /^[1-9]\d*$/,
                message: 'Invalid age'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Age"
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
                label="Address"
                error={!!error}
                helperText={error ? error.message : ''}
                required
              />
            )}
          />
          <RadioList label="Gender:" name="gender" items={genderList} onChange={(value) => setValue('gender', value)} value={watch('gender')} />

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
