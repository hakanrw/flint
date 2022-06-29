import { styled } from '@mui/material/styles';

import { Avatar, Button, CardActions, Card, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Paper, Typography } from "@mui/material";

import { useContext } from "react";
import AppContext from "../../appContext";
import Welcome from "../Welcome";



import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import PaellaImage from './paella.jpg';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Home() {
  const appContext = useContext(AppContext);

  if (!appContext.session) return (
    <Welcome />
  )
    
  return (
    <Container data-testid="home-container" sx={{mt: 5}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} >
          <Paper sx={{p: 2, '& button': {display: {xs: "inline", sm: "block"}, width: {sm: "100%"}, textAlign: "left"}}}>
            <Button>Feed</Button>
            <Button>Friends</Button>
            <Button>Messages</Button>
            <Button>My Profile</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <Paper sx={{p: 2}} >      
            <Typography color="primary" variant="h4">Feed</Typography>
          </Paper>
          <Card sx={{ marginLeft: "auto", marginRight: "auto", my: 2 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                X
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Hakan"
            subheader="June 28, 2022"
          />
            <CardMedia
              component="img"
              height="194"
              image={PaellaImage}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={false}
                aria-expanded={false}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          </Card>
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