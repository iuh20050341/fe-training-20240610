import React, { useContext, useState } from 'react';
import { AccountContext, AccountContextType } from '../../../contexts/Account/index.tsx';
import { Card, CardContent, Typography, Grid, Avatar, Box, IconButton, Container, Paper, Divider, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import userApi from '../../../api/userApi.ts';
import { Users } from '../../../types/user.type.ts';
import EditIcon from '@mui/icons-material/Edit';
import ReaderForm from '../../ReaderManagement/ReaderForm/index.tsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const queryClient = new QueryClient();
  const context = useContext(AccountContext) as AccountContextType;
  if (!context) {
    throw new Error('Errors');
  }
  const { loggedID } = context;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [readerToEdit, setReaderToEdit] = useState<Users | null>(null);

  const { data: user = [], refetch } = useQuery<Users, Error>({
    queryKey: ['users'],
    queryFn: async () => {
      if (!loggedID) {
        throw new Error('Logged ID is missing');
      }
      const response = await userApi.get(loggedID);
      return response.data.data;
    },
    retry: false,
  });
  

  const updateUserMutation = useMutation({
    mutationFn: ({ data }: { data }) => userApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Cập nhật thành công');
      refetch();
    },
    onError: (error) => {
      toast.error(`Cập nhật thất bại: ${error.message}`);
    }
  });

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleSaveReader = (reader: Users) => {
    if (readerToEdit && readerToEdit.id) {
      const updatedReader = { ...reader, id: readerToEdit.id };      
      updateUserMutation.mutate({ data: updatedReader });
    }
    handleFormClose();
  };

  const handleEditReader = async (id: string | number) => {
    try {
      const response = await userApi.get(id as string);
      setReaderToEdit(response.data.data);
      setIsFormOpen(true);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                <AccountCircleIcon sx={{ fontSize: 60 }} />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" component="div">
                User Profile
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" component="div">
                <b>Role: {user?.role?.name}</b>
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Box mt={4} sx={{ textAlign: 'left' }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="h6">
                  <strong>Username:</strong> {user?.name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Tooltip title="Edit User">
                  <IconButton
                    onClick={() => handleEditReader(user?.id as number)}
                    sx={{
                      bgcolor: 'blue',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'darkblue',
                      },
                      borderRadius: '50%',
                      padding: 1
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <strong>Email:</strong> {user?.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <strong>Address:</strong> {user?.address}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Paper>
      <ReaderForm open={isFormOpen} handleClose={handleFormClose} onSave={handleSaveReader} readerToEdit={readerToEdit} />
    </Container>
  );
};

export default UserProfile;
