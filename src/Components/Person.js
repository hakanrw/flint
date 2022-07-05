import { Avatar, Button, Card, CardHeader, Skeleton } from "@mui/material";

import { red } from '@mui/material/colors';
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Person({ username, id, avatar_url, loading = false, onPage = false, followed = false }) {
  const screenName = username || id || "unbeknownst";

  const navigate = useNavigate();

  const [isFollowed, setIsFollowed] = useState(followed);
  
  useEffect(() => {
    setIsFollowed(followed);
  }, [followed]);
  
  const handleFollow = useCallback(() => {
    setIsFollowed(-1);
    supabase.from("follows").insert({follower: supabase.auth.user().id, followee: id})
      .then(res => {
        console.log(res);
        if (res.error) return;
        setIsFollowed(true);
      })
  }, [id]);

  const handleUnfollow = useCallback(() => {
    setIsFollowed(-1);
    supabase.from("follows").delete().match({follower: supabase.auth.user().id, followee: id})
      .then(res => {
        if (res.error) return;
        setIsFollowed(false);
      })
  }, [id]);

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
            { onPage && isFollowed === true && <Button onClick={handleUnfollow}>Unfollow</Button> }
            { onPage && isFollowed === false && <Button onClick={handleFollow}>Follow</Button> }
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