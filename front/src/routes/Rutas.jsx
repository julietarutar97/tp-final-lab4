import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from '../pages/home.jsx'
import NotFound from '../pages/NotFound.jsx'
import Navbar from '../components/Navbar.jsx'
import Canchas from '../pages/Canchas.jsx'
import Reserva from '../pages/Reserva.jsx'
import VerReservas from '../pages/VerReservas.jsx'
import ConoceMas from '../pages/ConoceMas.jsx'
import Footer from '../components/Footer.jsx'
export default function Rutas() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/canchas" element={<Canchas />} />
        <Route path="/reservas" element={<Reserva />} />
        <Route path="/ver-reservas" element={<VerReservas />} />
        <Route path='/conoce-mas' element={<ConoceMas />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
