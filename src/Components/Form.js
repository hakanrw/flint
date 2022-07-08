import Paper from "@mui/material/Paper";
import Container from "@mui/system/Container";

function Form({ children }) {
  return (
    <Container maxWidth="sm" sx={{py: 4}}>
      <Paper sx={{p: 4, textAlign:"center", fontWeight: 600}}>
        {children}
      </Paper>
    </Container>
  );
}

export default Form;