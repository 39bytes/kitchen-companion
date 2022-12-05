import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar";
import {
  CalendarMonth,
  Kitchen,
  Logout,
  NoteAlt,
  Restaurant,
} from "@mui/icons-material";
import axios from "axios";

type LayoutProps = {
  children: React.ReactNode;
};

const drawerWidth = 240;

const Layout = ({ children }: LayoutProps) => {
  const logout = () => {
    axios.post("/auth/logout").then((data) => (window.location.href = "/"));
  };

  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, zIndex: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Fridge Friend</Typography>
          <IconButton
            size="medium"
            edge="end"
            color="inherit"
            aria-label="logout"
            sx={{ ml: "auto" }}
            onClick={logout}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {[
            ["My Fridge", <Kitchen />],
            ["Saved Recipes", <Restaurant />],
            ["Meal Planner", <CalendarMonth />],
            ["Grocery List", <NoteAlt />],
          ].map(([text, icon]) => (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" width="100%">
        <Toolbar />
        <Container sx={{ mt: 2 }}>{children}</Container>
      </Box>
    </Box>
  );
};

export default Layout;
