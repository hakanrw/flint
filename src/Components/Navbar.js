import { useCallback, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Typography from '@mui/material/Typography';


import BookIcon from '@mui/icons-material/Book';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { IconButton } from '@mui/material';

import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AppContext from '../appContext';
import { supabase } from '../supabaseClient';

let pages = [["News", "/news"], ["Blog", "/blog"], ["Contact", "/contact"]];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const appContext = useContext(AppContext);

  let navigate = useNavigate();

  let settings = [
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
            {
              pages.map(page => 
                <Button
                  key={page[1]}
                  sx={{ my: 2, color: 'white' }}
                  onClick={() => navigate(page[1])}>
                  {page[0]}
                </Button>
              )
            }
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