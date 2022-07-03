import { Paper, Typography } from "@mui/material";

function Announcement({ message }) {
  return (
    <Paper sx={{my: 2, p: 4, textAlign: "center"}}>
      <Typography variant="h5" color="primary">
        {message}
      </Typography>
    </Paper>
  );
}

export default Announcement;