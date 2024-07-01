import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface CustomizedDialogsProps {
  button: string;
  title: string;
  content: React.ReactNode;
  action: string;
  handleSave: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: 'auto', // Set the width of the dialog
    maxWidth: 'none', // Override the maximum width of the dialog
  },
}));

const CustomizedDialogs: React.FC<CustomizedDialogsProps> = ({ button, title, content, action, handleSave }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    handleSave();
    handleClose();
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {button}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {content}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            CLOSE
          </Button>
          {action.includes('Save') && (
            <Button onClick={handleConfirm}>
              Confirm
            </Button>           
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default CustomizedDialogs;
