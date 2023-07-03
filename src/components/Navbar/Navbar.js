import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

const pages = ["Bands", "New Booking", "Your Bookings"];
const pagesForAdmin = ["Bands", "View Bookings", "Manage Availability"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken from localStorage:", accessToken);
  const userId = localStorage.getItem("userId");
  console.log("userId from localStorage:", userId);
  const userName = localStorage.getItem("name");
  console.log("name from localStorage:", userName);

  // const put here to split the first and last name in the name of user. For display of ONLY firstName in navbar.
  const firstName = userName ? userName.split(" ")[0] : "";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onClickLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    navigate("/homepage");
  };

  const handleNavigation = (page) => {
    const pageName = {
      Bands: "bands",
      "Your Bookings": "/",
      "New Booking": "makenewbooking",
    };
    return pageName[page];
  };

  const handleNavigateForAdminPages = (pageForAdmin) => {
    const pageName = {
      Bands: "bands",
      "View Bookings": "admin-dashboard",
      "Manage Availability": "admin-availability",
    };
    return pageName[pageForAdmin];
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href={userName === "admin" ? "/admin-dashboard" : "/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Arial",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            OPUS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {userName === "admin"
                ? pagesForAdmin.map((pageForAdmin) => (
                    <MenuItem
                      key={pageForAdmin}
                      onClick={() => {
                        navigate(handleNavigateForAdminPages(pageForAdmin));
                      }}
                    >
                      <Typography textAlign="center">{pageForAdmin}</Typography>
                    </MenuItem>
                  ))
                : pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        navigate(handleNavigation(page));
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>

          {/* For mobile view */}

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Opus
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {userName === "admin"
              ? pagesForAdmin.map((pageForAdmin) => (
                  <Button
                    key={pageForAdmin}
                    onClick={() => {
                      navigate(handleNavigateForAdminPages(pageForAdmin));
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {pageForAdmin}
                  </Button>
                ))
              : pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => {
                      navigate(handleNavigation(page));
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Grid container alignItems="center" spacing={1}>
              {firstName && (
                <Grid item>
                  <Typography variant="subtitle1" sx={{ color: "white" }}>
                    {firstName}
                  </Typography>
                </Grid>
              )}
              {firstName && (
                <Grid item>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={firstName}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              )}
            </Grid>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === "Logout") {
                      onClickLogout(); // Call onClickLogout function for "Logout" setting
                    }
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
