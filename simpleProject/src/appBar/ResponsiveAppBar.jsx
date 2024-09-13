import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CircleIcon from '@mui/icons-material/Circle'; // For green dot
import { AuthContext } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

function ResponsiveAppBar() {
  const { user } = useContext(AuthContext);
  const settings = user.access;
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    navigate("/" + event.target.textContent.toLowerCase());
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user.given_name} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
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
            {settings.map((setting) => {
              const pagePath = "/" + setting.toLowerCase().replace(" ", "");
              const isActive = window.location.pathname === pagePath;

              return (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  {isActive && (
                    <CircleIcon sx={{ color: 'green', fontSize: '0.8rem', ml: 1 }} />
                  )}
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
