import {
  Box,
  Container,
  CssBaseline,
  CSSObject,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import {
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
  Kitchen,
  Logout,
  NoteAlt,
  Restaurant,
} from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Layout = ({ title, children }: LayoutProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState("My Fridge");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    axios.post("/auth/logout").then((data) => (window.location.href = "/"));
  };

  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        open={open}
        // sx={{
        //   width: `calc(100% - ${drawerWidth}px)`,
        //   ml: `${drawerWidth}px`,
        // }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{title ?? "Fridge Friend"}</Typography>
          <Tooltip title="Log out">
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
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        // sx={{
        //   width: drawerWidth,
        //   flexShrink: 0,
        //   "& .MuiDrawer-paper": {
        //     width: drawerWidth,
        //     boxSizing: "border-box",
        //   },
        // }}
        // anchor="left"

        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <List>
          {[
            ["My Fridge", <Kitchen />, "/"],
            ["Saved Recipes", <Restaurant />, "/"],
            ["Meal Planner", <CalendarMonth />, "/"],
            ["Grocery List", <NoteAlt />, "/grocery"],
          ].map(([text, icon, to]) => (
            <Link
              to={to.toString()}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem key={text.toString()} disablePadding>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Container sx={{ mt: 2 }}>{children}</Container>
      </Box>
    </Box>
  );
};

export default Layout;
