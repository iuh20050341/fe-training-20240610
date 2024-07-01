import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import Dialog from '@material-ui/core/Dialog';
import Chatbot from 'react-chatbot-kit';
import config from '../../chatbot/config.js';
import ActionProvider from '../../chatbot/ActionProvider.js';
import MessageParser from '../../chatbot/MessageParser.js';
import 'react-chatbot-kit/build/main.css';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.speedDial + 1,
  },
  dialog: {
    position: 'absolute',
    marginLeft: 1290,
    marginTop: 150
  },
}));

const ChatBotIcon = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab color="primary" className={classes.fab} onClick={handleClickOpen}>
        <ChatIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
        BackdropProps={{ invisible: true }}

      >
        <DialogContent>
            <Chatbot 
                config={config} 
                actionProvider={ActionProvider} 
                messageParser={MessageParser}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChatBotIcon;
