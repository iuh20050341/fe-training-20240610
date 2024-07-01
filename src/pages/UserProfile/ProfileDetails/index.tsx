import React, { useContext } from 'react';
import { AccountContext, AccountContextType } from '../../../contexts/Account/index.tsx';
import { Card, CardContent, Typography, Grid, Avatar, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfile = () => {
  const context = useContext(AccountContext) as AccountContextType;
  if (!context) {
    throw new Error('Errors');
  }
  const { loggedID, accounts } = context;
  const user = accounts.find(account => account.id === loggedID);

  return (
    <Card style={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 80, height: 80 }}>
              <AccountCircleIcon sx={{ fontSize: 60 }} />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" component="div">
              User Profile
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" component="div">
              {user?.rules === 1 ? 'ADMIN' : 'CUSTOMER'}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4} sx={{textAlign:'left'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Username:</strong> {user?.username}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Email:</strong> {user?.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Phone:</strong> {user?.phone}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
