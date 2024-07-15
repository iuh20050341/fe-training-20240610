import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";

const BookForm = ({ open, handleClose, onSave, bookToEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (bookToEdit) {
      setValue("title", bookToEdit.title);
      setValue("author", bookToEdit.author);
      setValue("publisher", bookToEdit.publisher);
      setValue("description", bookToEdit.description);
      setValue("quantity", bookToEdit.quantity);
      setValue("price", bookToEdit.price);
      setValue("image", bookToEdit.imgBase64);
      setValue("filename", bookToEdit.filename);
      setImagePreview(`data:image/png;base64,${bookToEdit.imgBase64}`);
    } else {
      reset({
        title: "",
        author: "",
        publisher: "",
        quantity: "",
        image: "",
        description: "",
        price: "",
        filename: "",
      });
      setImagePreview("");
    }
  }, [bookToEdit, reset, setValue]);
  let amountNew = 0;
  const handleSave = (data) => {
    const base64Image = data.image.split(",")[1];
    const book = {
      ...data,
      amount: amountNew,
      image: base64Image,
      filename: data.filename,
      quantity: parseInt(data.quantity),
      price: parseFloat(data.price),
    }; //quantity: parseInt(data.quantity), price: parseFloat(data.price)
    console.log(book);
    onSave(book);
    reset();
    setImagePreview("");

    // setTimeout(() => {
    //   bookToEdit ? toast.success('Update thành công') : toast.success('Thêm sách thành công');
    // }, 1500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === "string") {
        setValue("image", reader.result);
        setImagePreview(reader.result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
      setValue("filename", file.name);
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setValue('image', file.name);
  //   }
  // };

  return (
    <Dialog
      component="form"
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit(handleSave)}
    >
      <DialogTitle>{bookToEdit ? "Edit Book" : "Add Book"}</DialogTitle>
      <DialogContent sx={{ width: "400px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: "10px",
          }}
        >
          <TextField
            {...register("title", { required: true })}
            label="Title"
            error={!!errors.title}
            helperText={errors.title ? "Vui lòng nhập tên sách" : ""}
          />
          <TextField
            {...register("author", { required: true })}
            label="Author"
            error={!!errors.author}
            helperText={errors.author ? "Vui lòng nhập tác giả" : ""}
          />
          <TextField
            {...register("publisher", { required: true })}
            type="text"
            label="Publisher"
            error={!!errors.publiserh}
            helperText={errors.publisher ? "Vui lòng nhà xuất bản" : ""}
          />
          <TextField
            {...register("price", { required: true })}
            label="Price"
            type="number"
            error={!!errors.price}
            helperText={errors.price ? "Vui lòng nhập giá mượn sách" : ""}
          />
          <TextField
            {...register("quantity", { required: true })}
            label="Quantity"
            type="number"
            error={!!errors.quantity}
            helperText={errors.quantity ? "Vui lòng nhập số lượng sách" : ""}
          />
          <TextField
            {...register("description", { required: true })}
            multiline
            label="Description"
            rows={4}
            error={!!errors.description}
            helperText={errors.description ? "Vui lòng nhập mô tả sách" : ""}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "200px", height: "200px" }}
            />
          )}
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
          {bookToEdit ? "Save Changes" : "Add Book"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookForm;
