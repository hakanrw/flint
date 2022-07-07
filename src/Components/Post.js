import { styled } from '@mui/material/styles';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Skeleton, Typography } from "@mui/material";

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

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
  const { noImage = false, author, content, created_at, username, onDelete, id, comment } = props;
  
  const screenName = username || author || "unbeknownst";
  const isThisUser = author === supabase.auth.user().id;
  
  const navigate = useNavigate();
  const [anchorElOptions, setAnchorElOptions] = useState(null);
  const [loading, setLoading] = useState(props.loading || false);

  const handleOpenOptionsMenu = useCallback((event) => {
    setAnchorElOptions(event.currentTarget);
  }, []);

  const handleCloseOptionsMenu = useCallback(() => {
    setAnchorElOptions(null);
  }, []);

  useEffect(() => setLoading(props.loading), [props.loading])

  const goToPostView = useCallback(() => {
    navigate(`/people/${username}/${id}`);
  }, [navigate, username, id]);

  const handleDelete = () => {
    handleCloseOptionsMenu();
    setLoading(true);
    supabase.from(comment ? "comments" : "posts").delete().match({id}).then(() => {
      onDelete();
    })
  }

  return (
    <Card sx={{ marginLeft: "auto", marginRight: "auto", my: 2 }}>
      <CardHeader
        avatar={
          loading ?
          <Skeleton variant="circular" width={40} height={40} /> :
          <Link to={"/people/" + username} style={{ textDecoration: 'none' }}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {screenName[0]}
            </Avatar>
          </Link>
        }
        action={
          loading || !isThisUser ?
          null :
          <React.Fragment>
            <IconButton onClick={handleOpenOptionsMenu} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElOptions}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElOptions)}
                onClose={handleCloseOptionsMenu}
              >
                <MenuItem onClick={handleDelete}>
                  <ListItemIcon>
                    <DeleteForeverIcon sx={{color: red[500]}} />
                  </ListItemIcon>
                  <ListItemText sx={{color: red[500]}}><Typography sx={{fontWeight: 500}}>Delete</Typography></ListItemText> 
                </MenuItem>
              </Menu>
          </React.Fragment>
        }
        title={
          loading ? 
          <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} /> :
          <Link to={"/people/" + username} style={{ textDecoration: 'none', color: "inherit" }}>{screenName}</Link> 
        }
        subheader={
          loading ?
          <Skeleton height={10} width="40%" /> :
          moment(created_at).format('MMMM Do YYYY, h:mm a') 
        }
      />
        {
          loading && !noImage && !author && <Skeleton sx={{ height: 190 }} variant="rectangular" />
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
          !loading && !comment &&
          <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="comment" onClick={goToPostView}>
            <CommentIcon />
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