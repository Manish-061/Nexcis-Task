'use client';

import { Box, Container, Typography, Button } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js with MUI
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to the Next.js app with Material UI integration
        </Typography>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </Box>
    </Container>
  );
}