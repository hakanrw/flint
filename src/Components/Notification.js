import { Avatar, Button, Card, CardHeader, Skeleton, Typography } from "@mui/material";

import { Box } from "@mui/system";
import { Link } from "react-router-dom";

function Notification({ loading, content, link }) {
 
  return (
    <Card sx={{my: 1}}>
      <CardHeader
        sx={{'& .MuiCardHeader-action': {alignSelf: "center"}}}
        avatar={
          loading ?
          <Skeleton variant="circular" width={40} height={40} /> :
          <Avatar />
        }
        action={
          loading || !link ?
          null :
          <Box sx={{alignSelf: "center"}}>
            <Link to={link}><Button>Go</Button></Link>
          </Box>
        } 
        title={
          loading ? 
          <Box><Skeleton height={10} style={{ marginBottom: 6 }} /><Skeleton height={10} style={{ marginBottom: 6, width: "60%" }} /></Box> :
          <Typography>{content}</Typography>
        }
      />
    </Card>
  );
}

export default Notification;