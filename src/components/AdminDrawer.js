import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import "./dashboard.css";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 200;

function AdminDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const history = useHistory();

  const onNavigate = (e) => {
    console.log("first");
    e.preventDefault();
    history.push("/userlist");
    console.log("second");
  };

  const onUsersList = (e) => {
    console.log("threee");
    e.preventDefault();
    history.push("/dashboard");
    console.log("four");
  };

  const drawer = (
    <div>
      <Toolbar />

      <Divider />

      <List>
        <Box p={1}>
          <ListItem
            onClick={onUsersList}
            style={{ color: "black", cursor: "pointer" }}
          >
            <ListItemIcon style={{ color: "#B0C6BB" }}>
              <i class="fas fa-home" style={{ fontSize: "20px" }}></i>
            </ListItemIcon>
            <ListItemText primary={"Home List"} />
          </ListItem>
        </Box>

        <Divider />

        <Box p={1}>
          <ListItem
            onClick={onNavigate}
            style={{ color: "black", cursor: "pointer" }}
          >
            <ListItemIcon style={{ color: "#B0C6BB" }}>
              <i class="fas fa-users" style={{ fontSize: "20px" }}></i>
            </ListItemIcon>
            <ListItemText primary={"User List"} />
          </ListItem>
        </Box>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <i
          class="fas fa-users"
          style={{ fontSize: "20px", color: "black" }}
        ></i>
      </IconButton>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // PaperProps={{ style: { height: "50%" } }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          PaperProps={{ style: { height: "inherit" } }}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

AdminDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminDrawer;
