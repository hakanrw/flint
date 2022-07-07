import { Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import { supabase } from "../supabaseClient";

function Write({ onPost, comment, postId }) {
  const style = {sx: {my: 2}};
  
  const [value, setValue] = useState('');

  const sendPost = useCallback(() => {
    onPost();
    const _postval = value;
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

  const sendComment = useCallback(() => {
    onPost();
    const _postval = value;
    setValue('');
    
    supabase.rpc("create_comment", { content: _postval, post: postId }).then(res => {
      console.log(res);
      onPost(true);
      if (res.error) {
        setValue(_postval);
        return;
      }
    })
  }, [onPost, value, postId]);

  const onPostChange = useCallback(event => {
    setValue(event.target.value);
  }, []);

  const onPostKeyPress = useCallback(event => {
    if (event.keyCode===13 && event.ctrlKey) {
      if (comment) sendComment()
      else sendPost();
    }
  }, [sendPost, comment, sendComment]);

  return (
    <Paper sx={{my: 2, p: 2}}>
      <TextField {...style} variant="outlined" fullWidth label="What's on your mind?" multiline rows={comment ? 2 : 4} onChange={onPostChange} onKeyUp={onPostKeyPress} value={value} />
      <Box sx={{textAlign: "right"}}>
        { comment ? null : <Button variant="outlined">Save</Button> }
        <Button sx={{ml: 2}} variant="contained" onClick={comment ? sendComment : sendPost}>Send</Button>
      </Box>
    </Paper>
  );
}

export default Write;
