import { styled } from '@mui/material/styles';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Skeleton, Typography } from "@mui/material";

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Fragment, useEffect } from 'react';
import moment from 'moment';

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

function Post(props) {
  const { loading = false, author, content, created_at, username } = props;

  const screenName = username || author || "unbeknownst";

  useEffect(() => {
    console.log("post instaled")
  }, []);

  return (
    <Card sx={{ marginLeft: "auto", marginRight: "auto", my: 2 }}>
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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          loading ? 
          <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} /> :
          screenName 
        }
        subheader={
          loading ?
          <Skeleton height={10} width="40%" /> :
          moment(created_at).format('MMMM Do YYYY, h:mm a') 
        }
      />
        {
          loading && <Skeleton sx={{ height: 190 }} variant="rectangular" />
        }
        <CardContent>
          {
            loading ? 
            <Fragment> 
              <Skeleton height={10} style={{ marginBottom: 6 }} />
              <Skeleton height={10} style={{ marginBottom: 6 }} />
              <Skeleton height={10} width="80%" />
            </Fragment>
            : 
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          }
        </CardContent>
        {
          !loading && 
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
        }
        
    </Card>
  );
}

export default Post;