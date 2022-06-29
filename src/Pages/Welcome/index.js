import { Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div>
    <Container data-testid="welcome-container" maxWidth="sm" sx={{py: 4, position: {md: "absolute"}, right: "5%"}}>
      <Paper sx={{p: 4, textAlign:"center", fontWeight: 600}} >
      <Typography color="primary" variant="h3">Flint</Typography>
      <Typography sx={{my: 2}} color="primary" variant="h5">
        Explore the world of modern social platforming.
      </Typography>
      <Button sx={{mt: 15, width: {md: .4},  py: 1}} variant="contained" onClick={() => navigate("/login")}>Sign In Now</Button>
      </Paper>
    </Container>
    <BookIcon color="primary" sx={{position: "absolute", width: "20em", height: "20em", zIndex: -1, mt: "120px", left: "5%", display: {sm: "none", lg: "block"}}}></BookIcon>
    </div>
  )
}

export default Welcome;