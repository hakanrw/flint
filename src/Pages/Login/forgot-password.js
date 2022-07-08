import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"
import Form from "../../Components/Form";

import { useCallback, useState, useRef } from "react";
import { supabase } from '../../supabaseClient';

function ForgotPassword() {
  const style = {sx: {mt: 2}};
  const [message, setMessage] = useState(null);
  const mailRef = useRef(null);

  const sendMail = useCallback(async () => {
    setMessage(["info", "Sending mail..."]);
    const mail = mailRef.current.value;

    const { error } = await supabase.auth.api.resetPasswordForEmail(
      mail,
      {
        redirectTo: "/reset-password"
      }
    );

    if (error) {
      setMessage(["error", error.message]); 
      return;
    }
    setMessage(["success", "Check your mails!"]);
  }, []);

  const handleEnter = useCallback(event => {
    if (event.key === "Enter") sendMail();
  }, [sendMail]);

  return (
    <Form>
      <Typography color="primary" variant="h3">Forgot Password</Typography>
      <TextField {...style} fullWidth variant="outlined" label="E-mail" inputRef={mailRef} onKeyUp={handleEnter} />
      { message && <Alert {...style} severity={message[0]}>{message[1]}</Alert>}
      <Button {...style} aria-label="log in" variant="contained" onClick={sendMail}>Send Recovery Mail</Button>
    </Form>
  )
}

export default ForgotPassword;