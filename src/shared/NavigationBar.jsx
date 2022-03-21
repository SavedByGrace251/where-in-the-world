import {
  DarkMode as DarkModeIcon,
  Favorite as FavoriteIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { themeModeState } from "../atoms/themeMode.state";

function SmallScreenMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const [themeMode, setThemeMode] = useRecoilState(themeModeState);
  const [anchorEl, setAnchorEl] = useState(null);

  const hideFavoritesButton = location.pathname === "/favorites";
  const isLightMode = themeMode === "light";
  const menuOpen = Boolean(anchorEl);

  const toggleMode = () => {
    handleClose();
    setThemeMode(isLightMode ? "dark" : "light");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFavoritesNavigation = () => {
    handleClose();
    navigate("/favorites");
  };

  return (
    <>
      <IconButton
        id='basic-button'
        aria-controls={menuOpen ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {hideFavoritesButton ? undefined : (
          <MenuItem onClick={handleFavoritesNavigation}>
            <ListItemIcon>
              <FavoriteIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>View Favorites</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={toggleMode}>
          <ListItemIcon>
            {isLightMode ? (
              <DarkModeIcon fontSize='small' />
            ) : (
              <LightModeIcon fontSize='small' />
            )}
          </ListItemIcon>
          <ListItemText>
            {isLightMode ? "Dark Mode" : "Light Mode"}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

function LargeScreenButtons() {
  const location = useLocation();
  const [themeMode, setThemeMode] = useRecoilState(themeModeState);
  const isLightMode = themeMode === "light";

  const hideFavoritesButton = location.pathname === "/favorites";
  const navigate = useNavigate();

  const toggleMode = () => {
    setThemeMode(isLightMode ? "dark" : "light");
  };

  return (
    <>
      {hideFavoritesButton ? undefined : (
        <Button
          sx={{ mr: 2 }}
          variant='contained'
          onClick={() => navigate("/favorites")}
          startIcon={<FavoriteIcon />}
        >
          View Favorites
        </Button>
      )}
      <Button
        variant='contained'
        startIcon={isLightMode ? <DarkModeIcon /> : <LightModeIcon />}
        onClick={toggleMode}
      >
        {isLightMode ? "Dark Mode" : "Light Mode"}
      </Button>
    </>
  );
}

export function NavigationBar() {
  const theme = useTheme();
  const showButtons = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <AppBar position='static' sx={{ zIndex: 1 }}>
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant='h6'>
          Where in the world!
        </Typography>
        {showButtons ? <LargeScreenButtons /> : <SmallScreenMenu />}
      </Toolbar>
    </AppBar>
  );
}
