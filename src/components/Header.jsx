import { Link } from "react-router-dom";
import { Button, Box, AppBar, Toolbar, Typography } from "@mui/material";

// This Header function is created for header part for the website and has the navigation part eg: Home and Add New (Nav) link.

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Books
            </Typography>
          </Typography>
          {/* Home Link */}
          <Button color="inherit" variant="text" component={Link} to="/">
            Home
          </Button>
          {/* Add New */}
          <Button color="inherit" variant="text" component={Link} to="/addnew">
            Add New
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
