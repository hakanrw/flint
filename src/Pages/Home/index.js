
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';

import { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../../appContext";
import Feed from "../Feed";
import Profile from "../Profile";
import Welcome from "../Welcome";
import People from "../People";
import Notifications from "../Notifications";
import { supabase } from "../../supabaseClient";

const routes = [
  ["/", "Feed", <Feed />],
  ["/people", "People", <People />],
  ["/notifs", "Notifications", <Notifications />],
  ["/profile", "My Profile", <Profile />],
];

function Home() {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname + "/";

  const [notifCount, setNotifCount] = useState(0);

  const fetchNotifsCount = () => {
    supabase.rpc("get_notifs_count").then(data => {
      if (data.error) return;
      setNotifCount(data.data); 
    })
  }

  useEffect(() => {
    fetchNotifsCount();
    const interval = setInterval(() => fetchNotifsCount(), 8000);
    
    return function clearEffect() {
      clearInterval(interval);
    }
  }, [])
  
  if (!appContext.session) return (
    <Welcome />
  );

  return (
    <Container data-testid="home-container" sx={{mt: 5}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} >
          <Paper sx={{p: 2, display: {xs: "flex", sm: "block", overflowX: "auto"},
           '& button': {display: {xs: "inline", sm: "block"}, width: {sm: "100%"}, textAlign: "left", flexShrink: 0}}}>
            {
              routes.map(route => <Button key={route[0]} onClick={() => navigate(route[0])}>{route[1]} {route[0] === "/notifs" && notifCount > 0 && `(${notifCount})`}</Button> )
            }
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <Paper sx={{p: 2}} >
            <Typography color="primary" variant="h4">{routes.find(route => pathname.includes(route[0] + "/"))?.[1] || "Unknown"}</Typography>
          </Paper>
          <Routes>
            {
              routes.map(route => <Route key={route[0]} path={route[0] + "/*"} element={route[2]} /> )
            }
          </Routes>
        </Grid>
        <Grid item sx={{display: {xs: "none", md: "block"}}} md={3} >
          <Paper sx={{p: 2}}>
            <Typography color="primary">
              Flint is a thought expression platform. Write whatever you have on mind.
            </Typography>
            <Box sx={{display: "flex", alignItems: "center", gap: 1, marginTop: 5}}>
              <a href="https://hakan.candar.dev">hakan.candar.dev</a> 
              <CopyrightIcon fontSize="inherit" /> 
              <div>2023</div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home;