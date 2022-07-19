import React from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import { ListItemIcon } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function AdminDrawer() {
  const history = useHistory();

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onNavigate = (e) => {
    e.preventDefault();
    history.push("/userlist");
  };

  const onUsersList = (e) => {
    e.preventDefault();
    history.push("/dashboard");
  };

  const list = (anchor) => (
    <Box
      sx="250"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ backgroundColor: "#EEE", width: "300px" }}>
        <ListItem button>
          <ListItemText primary={"demo"} />
        </ListItem>
        <ListItem button onClick={onNavigate}>
          <ListItemIcon>
            <ListIcon
              style={{ color: "#B0C6BB", width: "30px", height: "45px" }}
            >
              {" "}
            </ListIcon>
          </ListItemIcon>
          <ListItemText primary={"Users List"} />
        </ListItem>
        <Divider />
        <ListItem button onClick={onUsersList}>
          <ListItemIcon>
            <HomeIcon
              style={{ color: "#B0C6BB", width: "30px", height: "45px" }}
            >
              {" "}
            </HomeIcon>
          </ListItemIcon>
          <ListItemText primary={"House List"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}>
            <HomeIcon
              style={{ color: "#B0C6BB", width: "40px", height: "30px" }}
            >
              {" "}
            </HomeIcon>
          </Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
