import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/ui/navbar';
import Container from '@mui/material/Container';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth={'xl'}>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/login'} element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
