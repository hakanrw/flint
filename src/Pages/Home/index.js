
import { Button, Container, Grid, Paper, Typography } from "@mui/material";

import { useContext } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../../appContext";
import Post from "../../Components/Post";
import WIP from "../../Components/WIP";
import Welcome from "../Welcome";

const routes = [
  ["/", "Feed", <Post />],
  ["/people", "People", <WIP />],
  ["/messages", "Messages", <WIP />],
  ["/profile", "My Profile", <WIP />],

];
function Home() {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname + "/";

  if (!appContext.session) return (
    <Welcome />
  );
  return (
    <Container data-testid="home-container" sx={{mt: 5}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} >
          <Paper sx={{p: 2, '& button': {display: {xs: "inline", sm: "block"}, width: {sm: "100%"}, textAlign: "left"}}}>
            {
              routes.map(route => <Button key={route[0]} onClick={() => navigate(route[0])}>{route[1]}</Button> )
            }
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <Paper sx={{p: 2}} >
            <Typography color="primary" variant="h4">{routes.find(route => pathname.includes(route[0] + "/"))?.[1] || "Unknown"}</Typography>
          </Paper>
          <Routes>
            {
              routes.map(route => <Route key={route[0]} path={route[0]} element={route[2]} /> )
            }
          </Routes>
        </Grid>
        <Grid item sx={{display: {xs: "none", md: "block"}}} md={3} >
          <Paper sx={{p: 2}}>
            <Typography color="primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.            
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home;