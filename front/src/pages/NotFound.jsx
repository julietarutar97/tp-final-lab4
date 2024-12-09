import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
    sx={{
      backgroundImage: `url(/notFound.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
    }}
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    >
      <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'primary.main' }}>
        404
      </Typography>
      <Typography variant="h4" component="h2" sx={{ marginBottom: 2, color: "text.secondary", fontSize: '3rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4, color: "text.secondary", textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Lo sentimos, la página que estás buscando no existe.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFound;
