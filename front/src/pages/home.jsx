import React from 'react';
import { Typography, Box, Button, Grid2} from '@mui/material';
//import Navbar from '../components/Navbar';
import { RxDividerHorizontal } from 'react-icons/rx';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Box 
      sx={{
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      {/* <Navbar /> */}
      <Box
        sx={{
          backgroundImage: `url(/padel_fondo.png)`,
          backgroundSize: 'cover', //esto no funcionaaaa
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
          Es más que un deporte
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
        component={Link} to="/conoce-mas"
        >
            Conocé más
        </Button>
      </Box>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center">
        <Grid2 container spacing={0} width="100%" display="flex" justifyContent="center" alignItems="center">
            <Grid2 size={6} justifyContent="center" alignItems="center" display="flex" flexDirection="column" >
                <Typography variant="h4" component="h3">
                    Mira nuestras canchas
                </Typography>
                <RxDividerHorizontal sx={{color: 'text.secondary'}} />
            </Grid2>
            <Grid2 
            sx={{bgcolor: 'primary.main',
                color: 'text.secondary',
                p: 2,
                pt: 7,
                pb: 7,
            }}
            size={6} 
            justifyContent="center" 
            alignItems="center" 
            display="flex"
            flexDirection="column">
                <Typography variant="h4" component="h3">
                    Hacé tu reserva
                </Typography>
                <RxDividerHorizontal sx={{color: 'text.secondary'}} />
            </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}
