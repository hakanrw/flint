import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Person from "../../Components/Person";
import { supabase } from "../../supabaseClient";

function PeopleSearch() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchRef = useRef(null);

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (!query) return;
    console.log("searching");
    setLoading(true);
    supabase.from("profiles").select("*").filter('username', 'like', `%${query}%`).limit(10)
      .then(data => {
        setLoading(false);
        setUsers(data.data);
      });
  }, [query]);

  return (
    <div>
      <Paper sx={{my: 2, p: 2}}>
        <Box sx={{display: "flex"}}>
          <TextField size="small" label="Search for people" inputRef={searchRef}/>
          <Button onClick={() => navigate("?q=" + encodeURIComponent(searchRef.current.value))} sx={{ml: 1}}>Search</Button>
        </Box>
      </Paper>
      {
        loading && 
        <React.Fragment>
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