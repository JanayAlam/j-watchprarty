import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/ui/navbar';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <div>Body</div>
    </>
  );
};

export default App;
