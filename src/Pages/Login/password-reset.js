import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"
import Form from "../../Components/Form";

import { useCallback, useState, useRef, useEffect } from "react";
import { supabase } from '../../supabaseClient';

function PasswordReset() {
  const style = {sx: {mt: 2}};
  const [message, setMessage] = useState(null);
  const [hash, setHash] = useState(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);

  useEffect(() => { 
    setHash(window.location.hash);
  }, []);

  const resetPassword = useCallback(async () => {
    setMessage(["info", "Resetting Password"]);
    const password = passwordRef.current.value;
    const rePassword = rePasswordRef.current.value;

    if (password !== rePassword) {
      setMessage(["error", "Passwords do not match."]); 
      return;
    }
    const hashArr = hash
      .substring(1)
      .split("&")
      .map((param) => param.split("="));

    let type;
    let accessToken;
    for (const [key, value] of hashArr) {
      if (key === "type") {
        type = value;
      } else if (key === "access_token") {
        accessToken = value;
      }
    }

    if (type !== "recovery" || !accessToken || typeof accessToken === "object") {
      setMessage(["error", "Invalid access token."]); 
      return;
    }

    const { error } = await supabase.auth.api.updateUser(accessToken, {
      password: password,
    });

    if (error) {
      setMessage(["error", error.message]); 
      return;
    }
    setMessage(["success", "Check your mails!"]);
  }, [hash]);

  const handleEnter = useCallback(event => {
    if (event.key === "Enter") resetPassword();
  }, [resetPassword]);

  const isError = Boolean(message && message[0] === "error");

  return (
    <Form>
      <Typography color="primary" variant="h3">Password Reset</Typography>
      <TextField error={isError} {...style} fullWidth variant="outlined" label="Password" type="password" inputRef={passwordRef} onKeyUp={handleEnter} />
      <TextField error={isError} {...style} fullWidth variant="outlined" label="Password Check" type="password" inputRef={rePasswordRef} onKeyUp={resetPassword} />

      { message && <Alert {...style} severity={message[0]}>{message[1]}</Alert>}
      <Button {...style} aria-label="log in" variant="contained" onClick={resetPassword}>Change Password</Button>
    </Form>
  )
}

export default PasswordReset;