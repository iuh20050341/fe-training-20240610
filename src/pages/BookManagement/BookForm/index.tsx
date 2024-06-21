  // import React, { useState, useEffect } from 'react';
  // import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
  // import MenuItem from '@mui/material/MenuItem';
  // import { toast } from 'react-toastify';
  // import 'react-toastify/dist/ReactToastify.css';
  // import Select from '@mui/material/Select';
  // import InputLabel from '@mui/material/InputLabel';
  // const categoryList = ['Electronics', 'Computers', 'Smartphones', 'Accessories'];

  // const BookForm = ({ open, handleClose, onSave, bookToEdit }) => {
  //   const [name, setName] = useState('');
  //   const [author, setAuthor] = useState('');
  //   const [category, setCategory] = useState('');
  //   const [description, setDescription] = useState('');
  //   const [quantity, setQuantity] = useState('');
  //   const [image, setImage] = useState('');
    
  //   useEffect(() => {
  //     if (bookToEdit) {
  //       setName(bookToEdit.name);
  //       setAuthor(bookToEdit.author);
  //       setCategory(bookToEdit.category);
  //       setDescription(bookToEdit.description);
  //       setQuantity(bookToEdit.quantity);
  //       setImage(bookToEdit.image);
  //       return () =>{
  //         setName('');
  //         setAuthor('');
  //         setCategory('');
  //         setDescription('');
  //         setQuantity('');
  //         setImage('');
  //       }
  //     }
  //   }, [bookToEdit]);

  //   const rating = 3.5
  //   const handleSave = () => {
  //     if (!name || !author || !category || !description || !quantity || !image) {
  //       toast.error('Vui lòng điền đầy đủ thông tin.');
  //       return;
  //     }else{
  //       const book = { name, author, category, rating, description, quantity, image };
  //       onSave(book);
  //       setName('');
  //       setAuthor('');
  //       setCategory('');
  //       setDescription('');
  //       setQuantity('');
  //       setImage('');
  //       setTimeout(() => {
  //         bookToEdit ? (toast.success('Update thành công')) : ((toast.success('Thêm sách thành công')))
  //       }, 1500);
  //     }

  //   };

  //   const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if(reader.result && typeof reader.result === 'string'){
  //         setImage(reader.result);
  //       }
  //     };
  //     if (file) {
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   return (
  //     <Dialog open={open} onClose={handleClose}>
  //       <DialogTitle>{bookToEdit ? 'Edit Book' : 'Add Book'}</DialogTitle>
  //       <DialogContent sx={{ width: '400px' }}>
  //         <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  //           <TextField
  //             label="Name"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //             required
  //           />
  //           <TextField
  //             label="Author"
  //             value={author}
  //             onChange={(e) => setAuthor(e.target.value)}
  //             required
  //           />
  //           <InputLabel id="demo-simple-select-label">Category</InputLabel>
  //             <Select
  //             labelId='category'
  //             id='category'
  //             value={category}
  //             onChange={(e) => setCategory(e.target.value)}
  //             required
  //             >
  //             {categoryList.map(category =>(
  //                 <MenuItem value={category}>{category}</MenuItem>

  //             ))}

  //           </Select>
  //           <TextField
  //             label="Quantity"
  //             type="number"
  //             value={quantity}
  //             onChange={(e) => setQuantity(e.target.value)}
  //             required

  //           />
  //           <TextField
  //             multiline
  //             label="Description"
  //             type="text"
  //             value={description}
  //             onChange={(e) => setDescription(e.target.value)}
  //             required
  //             rows={4}

  //           />
  //           <TextField
  //             id="outlined-controlled"
  //             label="Image"
  //             type="file"
  //             onChange={handleImageChange}
  //             required
  //             InputLabelProps={{ shrink: true }}
  //           />

  //         </Box>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleClose}>Cancel</Button>
  //         <Button onClick={handleSave} color="primary">
  //           {bookToEdit ? 'Save Changes' : 'Add Book'}
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   );
  // };

  // export default BookForm;
  import React, { useEffect } from 'react';
  import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
  import MenuItem from '@mui/material/MenuItem';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Select from '@mui/material/Select';
  import InputLabel from '@mui/material/InputLabel';
  import { useForm } from 'react-hook-form';
  
  const categoryList = ['Electronics', 'Computers', 'Smartphones', 'Accessories'];
  
  const BookForm = ({ open, handleClose, onSave, bookToEdit }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  
    useEffect(() => {
      if (bookToEdit) {
        setValue('name', bookToEdit.name);
        setValue('author', bookToEdit.author);
        setValue('category', bookToEdit.category);
        setValue('description', bookToEdit.description);
        setValue('quantity', bookToEdit.quantity);
        setValue('image', bookToEdit.image);
      } else {
        reset({
          name: '',
          author: '',
          category: '',
          description: '',
          quantity: '',
          image: ''
        });
      }
    }, [bookToEdit, reset, setValue]);
  
    const rating = 3.5;
    const amountBorrow = 0;
    const handleSave = (data) => {
      const book = { ...data, rating, amountBorrow };
      onSave(book);
      reset();
  
      setTimeout(() => {
        bookToEdit ? toast.success('Update thành công') : toast.success('Thêm sách thành công');
      }, 1500);
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setValue('image', reader.result);
        }
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <Dialog component="form" open={open} onClose={handleClose} onSubmit={handleSubmit(handleSave)}>
        <DialogTitle>{bookToEdit ? 'Edit Book' : 'Add Book'}</DialogTitle>
        <DialogContent sx={{ width: '400px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              {...register('name', { required: true })}
              label="Name"
              error={!!errors.name}
              helperText={errors.name ? 'Vui lòng nhập tên sách' : ''}
            />
            <TextField
              {...register('author', { required: true })}
              label="Author"
              error={!!errors.author}
              helperText={errors.author ? 'Vui lòng nhập tác giả' : ''}
            />
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              {...register('category', { required: true })}
              labelId='category'
              id='category'
              error={!!errors.category}
            >
              {categoryList.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
            <TextField
              {...register('quantity', { required: true })}
              label="Quantity"
              type="number"
              error={!!errors.quantity}
              helperText={errors.quantity ? 'Vui lòng nhập số lượng sách' : ''}
            />
            <TextField
              {...register('description', { required: true })}
              multiline
              label="Description"
              rows={4}
              error={!!errors.description}
              helperText={errors.description ? 'Vui lòng nhập mô tả sách' : ''}
            />
            <TextField
              id="outlined-controlled"
              label="Image"
              type="file"
              onChange={handleImageChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary">
            {bookToEdit ? 'Save Changes' : 'Add Book'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default BookForm;
  