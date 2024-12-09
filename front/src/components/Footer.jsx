import React from 'react'
import { Box, Typography, Link } from '@mui/material';


export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'primary.main', 
        color: '#fff',
        textAlign: 'center',
        py: 2,
        boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.2)',
        mt: 5,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Mi Sistema de Reservas. Todos los derechos reservados.
      </Typography>
      <Typography variant="body2">
        Creado con ❤️ por{' '}
        <Link
          href="https://tu-portafolio.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#fff', textDecoration: 'underline' }}
        >
          Tu Nombre
        </Link>
      </Typography>
    </Box>
  )
}
