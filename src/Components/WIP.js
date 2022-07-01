import { Paper, Typography } from "@mui/material";

function WIP() {
  return (
    <Paper sx={{my: 2, p: 4, textAlign: "center"}}>
      <Typography variant="h5" color="primary">
        We are working on this page
      </Typography>
    </Paper>
  );
}

export default WIP;