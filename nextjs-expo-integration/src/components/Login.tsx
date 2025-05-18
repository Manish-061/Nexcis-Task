'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      setSnackbar({
        open: true,
        message: 'Successfully signed in!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error signing in with Google', error);
      setSnackbar({
        open: true,
        message: 'Failed to sign in. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
          textAlign: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Sign in to access your dashboard
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          sx={{
            mt: 2,
            px: 3,
            py: 1.2,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#1a73e8',
              transform: 'scale(1.03)',
            },
          }}
        >
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity as any} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
