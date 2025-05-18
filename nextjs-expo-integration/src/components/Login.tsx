'use client';

import { useState } from 'react';
import { Box, Button, Typography, Container, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
          Sign in to access your dashboard
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </Box>
    </Container>
  );
}