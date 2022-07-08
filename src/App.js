import { useCallback, useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { supabase } from "./supabaseClient";
import Login from "./Pages/Login";

import Navbar from "./Components/Navbar";
import './App.css';
import { AppProvider } from './appContext';
import Home from './Pages/Home';
import ForgotPassword from './Pages/Login/forgot-password';
import PasswordReset from './Pages/Login/password-reset';

function App() {
  const [session, setSession] = useState(supabase.auth.session());
  const navigate = useNavigate();

  const checkRecovery = useCallback(() => {
    const hashArr = window.location.hash
    .substring(1)
    .split("&")
    .map((param) => param.split("="));

    let type;
    let accessToken;
    for (const [key, value] of hashArr) {
      if (key === "type") {
        type = value;
      } else if (key === "access_token") {
        accessToken = value;
      }
    }

    if (type === "recovery") navigate("/password-reset");
    console.log(hashArr); 
  }, [navigate]);

  useEffect(() => {
    checkRecovery();
  }, [checkRecovery]);

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
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
