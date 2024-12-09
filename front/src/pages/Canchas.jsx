import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid2, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Canchas = () => {
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/canchas')
      .then((response) => {
        setCanchas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{
        width: '100%',
        margin: 0,
        padding: 0,
     }}>
        
        <Box
        sx={{
          backgroundImage: `url(/imagen_fondo.jpg)`,
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
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pt: 8,
            color: 'white',
          }}
          variant="h3"
          component="h3"
          letterSpacing={2}
          fontWeight="bold"
        >
          Nuestras canchas
        </Typography>
        <Button
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: '10px',
          width: '200px',
          height: '50px',
          mt: 5,
          mb: 10,
          color: 'text.secondary',
        }}
        >
            Reservá
        </Button>
      </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 5 }}>
            <Grid2 container spacing={2} width="100%" display="flex" justifyContent="center" alignItems="center">
            {canchas.map((cancha) => (
            <Grid2 xs={12} sm={6} md={4} key={cancha.id}>
                <Paper sx={{ padding: 2 }}>
                <img src={`/imagenesCancha/${cancha.nombre}.jpg`} alt={cancha.nombre} style={{ width: '100%', height: '70vh' }} />
                <Typography variant="h6" component="h2">
                    {cancha.nombre}
                </Typography>
                <Typography variant="body1">
                    Techada: {cancha.techada ? 'Sí' : 'No'}
                </Typography>
                <Button variant="contained" color="primary" component={Link} to={`/reservas`} sx={{ mt: 2 }} > Reserva </Button>
                </Paper>
            </Grid2>
            ))}
            </Grid2>
        </Box>
    </Box>
  );
};

export default Canchas;
