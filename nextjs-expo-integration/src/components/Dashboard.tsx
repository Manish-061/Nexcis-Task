'use client';

import { Box, Button, Typography, Container, Avatar, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import NotificationTester from './NotificationTester';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 8,
          pb: 6,
        }}
      >
        <Avatar 
          src={user?.photoURL || undefined} 
          alt={user?.displayName || 'User'} 
          sx={{ width: 80, height: 80, mb: 2 }} 
        />
        
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome, {user?.displayName}!
        </Typography>
        
        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
          You are now signed in with your Google account.
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Email: {user?.email}
        </Typography>
        
        <Button
          variant="outlined"
          color="primary"
          startIcon={<LogoutIcon />}
          onClick={signOut}
          sx={{ mt: 4 }}
        >
          Sign Out
        </Button>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <NotificationTester />
    </Container>
  );
}