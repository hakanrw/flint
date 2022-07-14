import { Button, Card, CardHeader, Skeleton } from "@mui/material";

import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import AvatarLink from "./Avatar";

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
        sx={{'& .MuiCardHeader-action': {alignSelf: "center"}}}
        avatar={
          loading ?
          <Skeleton variant="circular" width={40} height={40} /> :
          <AvatarLink username={username} avatar_url={avatar_url} />
        }
        action={
          loading ?
          null :
          <Box>
            { onPage && isFollowed === true && <Button onClick={handleUnfollow}>Unfollow</Button> }
            { onPage && isFollowed === false && <Button onClick={handleFollow}>Follow</Button> }
            { !onPage && <Button onClick={() => navigate("/people/" + username)}>Profile</Button> }
          </Box>
        } 
        title={
          loading ? 
          <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} /> :
          <Link to={"/people/" + username} style={{ textDecoration: 'none', color: "inherit" }}>{screenName}</Link> 
        }
      />
    </Card>
  );
}

export default Person;