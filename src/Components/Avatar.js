import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";



function AvatarLink({ username, avatar_url }) {
  return (
    <Link to={"/people/" + username} style={{ textDecoration: 'none' }}>
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={avatar_url ? supabase.storage.from("avatars").getPublicUrl(avatar_url).publicURL : undefined}>
        {username[0]}
      </Avatar>
    </Link>
  )
}

export default AvatarLink;
