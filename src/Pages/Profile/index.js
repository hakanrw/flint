// BAD CODE BAD CODE BAD CODE PLEASE FIX

import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState(null);

  const fetchProfile = () => supabase.rpc("get_current_profile").then(user => user.data[0])
    .then(data => setProfile({...data, email: supabase.auth.user().email})); 
  
  useEffect(() => {
    fetchProfile();
  }, []); 

  const style = {sx: {mt: 2, display: "block"}};

  const valueChange = (field, event) => {
    setUpdatedProfile({...updatedProfile, [field]: event.target.value, avatar_url: ""});
  };

  const updateProfile = () => {
    if (updateProfile === null) return;
    setProfile(null);
    supabase.rpc("update_profile", updatedProfile).then(console.log).then(() => fetchProfile())
  }

  if (profile === null) {
    return (
      <Paper sx={{my: 2, p: 2}}>
        <Alert severity="info">Loading profile...</Alert>
      </Paper> 
    );
  }
  return (
    <Paper sx={{my: 2, p: 2}}>
      <Typography variant="h5" color="primary">Profile Settings</Typography>
      <TextField {...style} label="Username" variant="outlined" defaultValue={profile.username} onKeyUp={event => valueChange("username", event)} />
      <TextField {...style} label="E-mail" variant="outlined" value={profile.email} disabled />
      <Box sx={{maxWidth: "150px"}}>
        <Button fullWidth {...style} variant="outlined">My Profile</Button>
        <Button onClick={updateProfile} fullWidth {...style} variant="contained">Save Changes</Button>
      </Box>
    </Paper>
  );
}

export default memo(Profile);