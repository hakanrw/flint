import { useCallback, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Typography from '@mui/material/Typography';


import BookIcon from '@mui/icons-material/Book';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, IconButton, InputBase, styled } from '@mui/material';

import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AppContext from '../appContext';
import { supabase } from '../supabaseClient';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: "350px",
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  [theme.breakpoints.only('xs')]: {
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  width: '100%'
  
}));

function SearchUtility() {
  const navigate = useNavigate();

  const searchFunction = useCallback(event => {
    if (event.key === "Enter") navigate("/people?q=" + encodeURIComponent(event.target.value));
  }, [navigate]);

  return (
    <Search> 
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for people"
        inputProps={{ 'aria-label': 'search' }}
        onKeyUp={searchFunction}
      />
    </Search>
  );
}

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const appContext = useContext(AppContext);

  const navigate = useNavigate();

  const settings = [
    ["Settings",() => console.log("i called")],
    ["Profile", ],
    ["Log Out", () => supabase.auth.signOut()],
  ];

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box onClick={() => navigate("/")} sx={{ flexGrow: 0, cursor: "pointer" }}>
            <BookIcon sx={{ display: { md: 'inline-flex' }, mr: 1, verticalAlign: "text-bottom"}} />
            <Typography variant="h6" component="div" sx={{
              mr: 2,
              display: { xs: 'none', md: 'inline-flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}>
              Flint
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            { appContext.session && <SearchUtility /> }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} color="inherit">
                <AccountBoxIcon />
              </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {
                  !appContext.session &&
                  <MenuItem
                    onClick={() => {navigate("/login"); handleCloseUserMenu()}}>
                    Log In
                  </MenuItem>
                }
                {
                  appContext.session && settings.map(setting => 
                    <MenuItem
                      key={setting[0]}
                      onClick={() => {setting[1](); handleCloseUserMenu()}}>
                      {setting[0]}
                    </MenuItem>
                  )
                }
                
              </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;