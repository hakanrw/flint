import { Alert, Box, Button, Paper, TextField } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Person from "../../Components/Person";
import { supabase } from "../../supabaseClient";

function PeopleSearch() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchRef = useRef(null);

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    setError(null);
    if (!query) return;
    if (query.length < 3) {
      setError("Input at least 3 characters.")
      return;
    }
    setLoading(true);
    supabase.from("profiles").select("*").ilike('username', `%${query}%`).limit(10)
      .then(data => {
        setLoading(false);
        setUsers(data.data);
      });
  }, [query]);

  const onSearch = useCallback(() => {
    navigate("?q=" + encodeURIComponent(searchRef.current.value));
  }, [navigate]);

  const onKeyPress = useCallback(event => {
    if (event.keyCode===13) onSearch();
  }, [onSearch]);

  return (
    <div>
      <Paper sx={{my: 2, p: 2}}>
        <Box sx={{display: "flex"}}>
          <TextField size="small" label="Search for people" onKeyUp={onKeyPress} inputRef={searchRef} />
          <Button onClick={onSearch} sx={{ml: 1}}>Search</Button>
        </Box>
        { error && <Alert sx={{mt: 2}} severity="error">{error}</Alert>}
      </Paper>
      {
        loading && 
        <React.Fragment>
          <Person loading />
          <Person loading />
          <Person loading />
          <Person loading />
        </React.Fragment>
      }
      {
        !loading && users && users.map(user => <Person key={user.id} username={user.username} id={user.id} avatar_url={user.avatar_url} />)
      }
    </div>
  );
}

export default PeopleSearch;