import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Reserva = () => {
  const [formData, setFormData] = useState({
    cancha_id: '',
    dia: '',
    hora: '',
    duracion: '',
    telefono_contacto: '',
    nombre_contacto: '',
  });

  const [dialog, setDialog] = useState({
    open: false,
    title: '',
    message: '',
    severity: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/reservas', formData)
      .then((response) => {
        // Mostrar mensaje de éxito con el ID de la reserva creada
        setDialog({
          open: true,
          title: 'Reserva Creada',
          message: `La reserva fue creada exitosamente. ID: ${response.data.id}`,
          severity: 'success',
        });
        setFormData({
          cancha_id: '',
          dia: '',
          hora: '',
          duracion: '',
          telefono_contacto: '',
          nombre_contacto: '',
        }); // Limpiar el formulario
      })
      .catch((error) => {
        // Mostrar mensaje de error
        const errorMessage =
          error.response?.data?.detail || 'Ocurrió un error al intentar guardar la reserva.';
        setDialog({
          open: true,
          title: 'Error',
          message: `No se pudo guardar la reserva: ${errorMessage}`,
          severity: 'error',
        });
      });
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, title: '', message: '', severity: '' });
  };

  return (
    <Box
      sx={{ padding: 15 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h4" component="h1">
        Crear Reserva
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="ID de la Cancha"
          name="cancha_id"
          value={formData.cancha_id}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Día"
          type="date"
          name="dia"
          value={formData.dia}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            inputProps: { min: '2023-01-01' },
          }}
        />
        <TextField
          label="Hora"
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            inputProps: { step: 300 },
          }}
        />
        <TextField
          label="Duración (horas)"
          type="number"
          name="duracion"
          value={formData.duracion}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Nombre de Contacto"
          name="nombre_contacto"
          value={formData.nombre_contacto}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Teléfono de Contacto"
          name="telefono_contacto"
          value={formData.telefono_contacto}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Crear Reserva
        </Button>
      </Box>

      {/* Dialog para mensajes */}
      <Dialog
        open={dialog.open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'text.primary' }}>
            {dialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reserva;
