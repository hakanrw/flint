import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";

import { supabase } from "./supabaseClient";
import Login from "./Pages/Login";

import Typography from '@mui/material/Typography';
import Navbar from "./Components/Navbar";
import './App.css';
import { AppProvider } from './appContext';
import Home from './Pages/Home';

function App() {
  const [session, setSession] = useState(supabase.auth.session());
  
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="App">
      <AppProvider value={{session}}>
      <Navbar />
      <Routes>
        <Route path="/news" element={<Typography align="center" variant="h4" sx={{my: 5}}>WIP</Typography>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
