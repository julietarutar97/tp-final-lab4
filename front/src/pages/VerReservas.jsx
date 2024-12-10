import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid2,
  Paper,
  Button,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [editReservaId, setEditReservaId] = useState(null);
  const [formData, setFormData] = useState({
    cancha_id: '',
    dia: '',
    hora: '',
    duracion: '',
    nombre_contacto: '',
    telefono_contacto: '',
  });
  const [filterCriteria, setFilterCriteria] = useState({
    cancha_id: '',
    dia: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, reservaId: null });

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/reservas')
      .then((response) => {
        const sortedReservas = response.data.sort((a, b) => new Date(a.dia) - new Date(b.dia));
        setReservas(sortedReservas);
        setFilteredReservas(sortedReservas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditClick = (reserva) => {
    setEditReservaId(reserva.id);
    setFormData({
      cancha_id: reserva.cancha_id,
      dia: reserva.dia,
      hora: reserva.hora,
      duracion: reserva.duracion,
      nombre_contacto: reserva.nombre_contacto,
      telefono_contacto: reserva.telefono_contacto,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = (reservaId) => {
    axios
      .put(`http://localhost:8000/api/reservas/${reservaId}`, formData)
      .then((response) => {
        setReservas((prevReservas) =>
          prevReservas.map((reserva) =>
            reserva.id === reservaId ? response.data : reserva
          )
        );
        setFilteredReservas((prevReservas) =>
          prevReservas.map((reserva) =>
            reserva.id === reservaId ? response.data : reserva
          )
        );
        setEditReservaId(null);
        setOpenSnackbar({ open: true, message: 'Reserva modificada con éxito', severity: 'success' });
      })
      .catch((error) => {
        console.error(error);
        setOpenSnackbar({ open: true, message: 'No se pudo modificar la reserva', severity: 'error' });
      });
  };

  const handleDeleteClick = (reservaId) => {
    axios
      .delete(`http://localhost:8000/api/reservas/${reservaId}`)
      .then(() => {
        setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== reservaId));
        setFilteredReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== reservaId));
        setDeleteDialog({ open: false, reservaId: null });
        setOpenSnackbar({ open: true, message: 'Reserva eliminada con éxito', severity: 'success' });
      })
      .catch((error) => {
        console.error(error);
        setDeleteDialog({ open: false, reservaId: null });
        setOpenSnackbar({ open: true, message: 'No se pudo eliminar la reserva', severity: 'error' });
      });
  };

  const handleFilterChange = (e) => {
    setFilterCriteria({
      ...filterCriteria,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    const filtered = reservas.filter((reserva) => {
      return (
        (filterCriteria.cancha_id === '' || reserva.cancha_id.toString() === filterCriteria.cancha_id) &&
        (filterCriteria.dia === '' || reserva.dia === filterCriteria.dia)
      );
    });
    setFilteredReservas(filtered);
  };

  const handleClearFilters = () => {
    setFilterCriteria({
      cancha_id: '',
      dia: '',
    });
    setFilteredReservas(reservas);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <Box
      sx={{
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(/reservas.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          //backgroundRepeat: 'no-repeat',
          height: '90vh',
         mt: 8,
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
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
          variant="h3"
          component="h3"
          letterSpacing={2}
          fontWeight="bold"
        >
          Nuestras reservas
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" sx={{ mt: 4, mb: 2 }}>
        <TextField
          label="ID de la Cancha"
          name="cancha_id"
          value={filterCriteria.cancha_id}
          onChange={handleFilterChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Día"
          type="date"
          name="dia"
          value={filterCriteria.dia}
          onChange={handleFilterChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleFilter} sx={{ mr: 2 }}>
          Filtrar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
          Limpiar Filtros
        </Button>
      </Box>
      <Grid2
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', mt: 5 }}
        container
        spacing={2}
      >
        {filteredReservas.map((reserva) => (
          <Grid2 sx={{ mr: 2, ml: 2, borderRadius: '35px' }} item xs={12} sm={6} md={4} key={reserva.id}>
            <Paper sx={{ padding: 2 }}>
              {editReservaId === reserva.id ? (
                <>
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
                    InputLabelProps={{
                      shrink: true,
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
                    InputLabelProps={{
                      shrink: true,
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveClick(reserva.id)}
                    sx={{ mt: 2, mr: 2 }}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setEditReservaId(null)}
                    sx={{ mt: 2 }}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                                    <Typography variant="h6" component="h2">
                    Reserva ID: {reserva.id}
                  </Typography>
                  <Typography variant="body1">Cancha ID: {reserva.cancha_id}</Typography>
                  <Typography variant="body1">Día: {reserva.dia}</Typography>
                  <Typography variant="body1">Hora: {reserva.hora}</Typography>
                  <Typography variant="body1">Duración: {reserva.duracion} horas</Typography>
                  <Typography variant="body1">Nombre de Contacto: {reserva.nombre_contacto}</Typography>
                  <Typography variant="body1">Teléfono de Contacto: {reserva.telefono_contacto}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(reserva)}
                    sx={{ mt: 2 }}
                  >
                    Modificar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setDeleteDialog({ open: true, reservaId: reserva.id })}
                    sx={{ mt: 2, ml: 2 }}
                  >
                    Eliminar
                  </Button>
                </>
              )}
            </Paper>
          </Grid2>
        ))}
      </Grid2>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={openSnackbar.severity}
          sx={{ width: '100%' }}
        >
          {openSnackbar.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, reservaId: null })}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.primary' }}>
            ¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se
            puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, reservaId: null })}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteClick(deleteDialog.reservaId)}
            color="error"
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reservas;
