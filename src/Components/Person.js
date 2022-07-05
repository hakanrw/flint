import { Avatar, Button, Card, CardHeader, Skeleton } from "@mui/material";

import { red } from '@mui/material/colors';
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

function Person({ username, id, avatar_url, loading = false, onPage = false }) {
  const screenName = username || id || "unbeknownst";

  const navigate = useNavigate();

  return (
    <Card sx={{my: 2}}>
      <CardHeader
        avatar={
          loading ?
          <Skeleton variant="circular" width={40} height={40} /> :
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {screenName[0]}
          </Avatar>
        }
        action={
          loading ?
          null :
          <Box>
            <Button>Follow</Button>
            { !onPage && <Button onClick={() => navigate(username)}>Profile</Button> }
          </Box>
        }
        title={
          loading ? 
          <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} /> :
          screenName 
        }
      />
    </Card>
  );
}

export default Person;