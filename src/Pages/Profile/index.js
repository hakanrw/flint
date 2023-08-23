import { Alert, Avatar, Button, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import { Box } from "@mui/system";
import { memo, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState(null);
  const [error, setError] = useState(null);
  const [filename, setFilename] = useState(null);
  const [cleared, setCleared] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = () => supabase.rpc("get_current_profile").then(user => user.data[0])
    .then(data => setProfile({...data, email: supabase.auth.user().email})); 
  
  useEffect(() => {
    fetchProfile();
  }, []); 

  const style = {sx: {mt: 2, display: "block"}};

  const valueChange = (field, event) => {
    setUpdatedProfile({...updatedProfile, [field]: event.target.value});
  };

  const imageChange = async (event) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const { name } = file;
    setFilename([name, 0]);
    setCleared(false);

    const userId = supabase.auth.user().id;

    const uploadedName = `${userId}.${new Date().getTime()}.png`;
    supabase.storage.from("avatars").upload(uploadedName, file, {
      cacheControl: '3600',
      upsert: false
    }).then(res => {
      if (res.error) {
        setError(res.error.message);
        return;
      }
      setFilename([name, 1]);
      setUpdatedProfile({...updatedProfile, avatar_url: uploadedName});
    });
  }

  const updateProfile = () => {
    if (updateProfile === null) return;
    const lastData = { ...profile, ...updatedProfile};
    setProfile(null);
    setError(null);
    setFilename(null);
    setCleared(false);
    setUpdatedProfile(null);
    supabase.rpc("update_profile",  {username: lastData.username, avatar_url: lastData.avatar_url})
      .then(res => {
        console.log(res);
        if (res.error) setError(res.error.details);
      })
      .then(() => fetchProfile())
  }

  const clearImage = () => {
    valueChange("avatar_url", {target: { value: ""}});
    setFilename(null);
    setCleared(true);
  }

  if (profile === null) {
    return (
      <Paper sx={{my: 2, p: 2}}>
        <Alert severity="info">Loading profile...</Alert>
      </Paper> 
    );
  }

  let currPhotoUnsaved = updatedProfile?.avatar_url || profile.avatar_url;
  if (updatedProfile?.avatar_url === "") currPhotoUnsaved = "";

  return (
    <Paper sx={{my: 2, p: 2}}>
      <Typography variant="h5" color="primary">Profile Settings</Typography>
      <Box sx={{my: 2, mb: 3, display: "flex", alignItems: "center", gap: 3}}>
        <Avatar src={currPhotoUnsaved && supabase.storage.from("avatars").getPublicUrl(currPhotoUnsaved).publicURL} sx={{ width: 90, height: 90 }}/>
        <Box sx={{flexGrow: 1}}>
          <Box sx={{display: "flex"}}>
            <Button fullWidth sx={{maxWidth: "150px"}} variant="contained" component="label">
              Upload Image
              <input type="file" accept="image/png" hidden onChange={imageChange} />
            </Button>
            { filename && <Typography sx={{alignSelf: "center", ml: 1}}>{filename[0]} {filename[1] ? <DoneIcon color="primary" sx={{verticalAlign: "middle"}}/> : null}</Typography> }
          </Box>
          { filename && !filename[1] && <LinearProgress sx={{mt: 1, maxWidth: "225px"}} />}
          <Box sx={{mt: 1, display: "flex"}}>
            <Button fullWidth variant="contained" sx={{maxWidth: "150px"}} onClick={clearImage}>Clear Image</Button>
            { cleared && <Typography sx={{alignSelf: "center", ml: 1}}><DoneIcon color="primary" sx={{verticalAlign: "middle"}}/></Typography> }
          </Box>
        </Box>
      </Box>
      <TextField {...style} label="Username" variant="outlined" defaultValue={profile.username} onKeyUp={event => valueChange("username", event)} />
      <TextField {...style} label="E-mail" variant="outlined" value={profile.email} disabled />
      { error && <Alert sx={{my: 2}} severity="error">{error}</Alert>}
      <Box sx={{maxWidth: "150px"}}>
        <Button onClick={() => navigate("/people/" + profile.username)} fullWidth {...style} variant="outlined">My Profile</Button>
        <Button onClick={updateProfile} fullWidth {...style} variant="contained">Save Changes</Button>
      </Box>
    </Paper>
  );
}

export default memo(Profile);