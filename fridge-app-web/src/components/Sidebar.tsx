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
  const logout = () => {
    axios.post("/auth/logout").then((data) => (window.location.href = "/"));
  };

  return (
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
  );
};

export default Sidebar;
