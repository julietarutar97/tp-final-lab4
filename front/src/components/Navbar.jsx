import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <SportsTennisIcon sx={{ mr: 1 }} />
            Padel Zone
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/canchas">
            Canchas
          </Button>
          <Button color="inherit" component={Link} to="/reservas">
            Crear reserva
          </Button>
          <Button color="inherit" component={Link} to="/ver-reservas">
            Reservas
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

