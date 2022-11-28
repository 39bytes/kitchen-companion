import {
  CalendarMonth,
  Kitchen,
  Logout,
  Restaurant,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import theme from "../theme";
import axios from "axios";

const Sidebar = () => {
  // TODO: Switch to axios
  const logout = () => {
    axios.post("/auth/logout").then((data) => (window.location.href = "/"));
    // fetch("/auth/logout", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) => {
    //   window.location.href = "/";
    // });
  };
  return (
    <Paper
      sx={{
        width: theme.spacing(30),
        height: "100vh",
        bgcolor: "background.paper",
        position: "fixed",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Kitchen />
            </ListItemIcon>
            <ListItemText primary="My Fridge" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Restaurant />
            </ListItemIcon>
            <ListItemText primary="Saved Recipes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CalendarMonth />
            </ListItemIcon>
            <ListItemText primary="Meal Planner" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export default Sidebar;
