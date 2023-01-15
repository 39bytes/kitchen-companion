import { Kitchen, Restaurant, Search } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { string } from "yup/lib/locale";

type NavItemProps = {
  data: { title: string; icon: JSX.Element; path: string };
};

const NavItem = ({ data }: NavItemProps) => {
  const { title, icon, path } = data;
  return (
    <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem key={title} disablePadding>
        <ListItemButton
          sx={{
            minHeight: 48,
            //justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              //mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={title} />
          {/* <ListItemText primary={title} /> sx={{ opacity: open ? 1 : 0 }} /> */}
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

const Navbar = () => {
  const navData = [
    {
      title: "My Ingredients",
      path: "/",
      icon: <Kitchen />,
    },
    {
      title: "Saved Recipes",
      path: "/recipes",
      icon: <Restaurant />,
    },
    {
      title: "My Ingredients",
      path: "/recommendations",
      icon: <Search />,
    },
  ];
  return (
    <List>
      {navData.map((item) => (
        <NavItem data={item} key={item.title} />
      ))}
    </List>
  );
};
