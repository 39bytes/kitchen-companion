import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { Kitchen, Restaurant, CalendarMonth } from "@mui/icons-material";
import { Box } from "@mui/system";
import React from "react";
import theme from "../theme";

const Sidebar = () => {
  return (
    <Paper
      sx={{
        width: theme.spacing(35),
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
      </List>
    </Paper>
  );
};

export default Sidebar;
