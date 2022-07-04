import { Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import { supabase } from "../supabaseClient";

function Write({ onPost }) {
  const style = {sx: {my: 2}};
  
  const [value, setValue] = useState('');

  const sendPost = useCallback(() => {
    onPost();
    const _postval = value;
    console.log(value);
    setValue('');
    
    supabase.rpc("create_post", { content: _postval }).then(res => {
      console.log(res);
      onPost(true);
      if (res.error) {
        setValue(_postval);
        return;
      }
    })
  }, [onPost, value]);

  const onPostChange = useCallback(event => {
    setValue(event.target.value);
  }, []);

  const onPostKeyPress = useCallback(event => {
    if (event.keyCode===13 && event.ctrlKey) sendPost();
  }, [sendPost]);

  return (
    <Paper sx={{my: 2, p: 2}}>
      <TextField {...style} variant="outlined" fullWidth label="What's on your mind?" multiline rows={4} onChange={onPostChange} onKeyUp={onPostKeyPress} value={value} />
      <Box sx={{textAlign: "right"}}>
        <Button variant="outlined">Save</Button>
        <Button sx={{ml: 2}} variant="contained" onClick={sendPost}>Send</Button>
      </Box>
    </Paper>
  );
}

export default Write;