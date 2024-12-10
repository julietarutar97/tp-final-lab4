import React from 'react';
import { Box, Typography, Paper, Grid2 } from '@mui/material';

const SobreNosotros = () => {
  return (
    <Box
      sx={{
        
        width: '100%',
        margin: 0,
        padding: 0,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
         color: 'white',
       // textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
       // padding: 4,
      }}
    >
        <Box
        sx={{
            backgroundImage: `url(/conoce-mas.jpg)`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '90vh',
    
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <Typography
            variant="h3"
            component="h3"
            letterSpacing={2}
            fontWeight="bold"
            
            sx={{ mb: 4, mt: 8,textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}
        >
            Conoce Más
        </Typography>
        </Box>
      <Box
        sx={{
          padding: 4,
        //   backgroundColor: 'rgba(0, 0, 0, 0.6)',
        //  borderRadius: '15px',
          mt: 8,
          color: 'text.primary',
        }}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h5" component="h5" gutterBottom>
          Proyecto Final
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Este sistema de reserva de canchas de paddle es un proyecto final para el curso
          de Laboratorio de Computación IV en la facultad UTN FRP. El objetivo del proyecto es 
          implementar un sistema que gestione la reserva de canchas utilizando tecnologías
          como React, Python con FastAPI, SQLAlchemy y una base de datos Postgres.
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          El proyecto incluye funcionalidades como la creación, modificación y eliminación
          de reservas, así como la consulta de reservas por día y por cancha.
        </Typography>
    

        <Grid2 container spacing={2} sx={{ mt: 3 }}>
          <Grid2 item xs={12} sm={6}>
            <Typography variant="h6" component="h6">
              Tecnologías Utilizadas
            </Typography>
            <Typography variant="body2" component="p">
              - React
              <br />
              - Python con FastAPI
              <br />
              - SQLAlchemy
              <br />
              - Base de datos Postgres
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography variant="h6" component="h6">
              Funcionalidades del Sistema
            </Typography>
            <Typography variant="body2" component="p">
              - Creación de reservas
              <br />
              - Modificación de reservas
              <br />
              - Eliminación de reservas
              <br />
              - Consulta de reservas por día y por cancha
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default SobreNosotros;
