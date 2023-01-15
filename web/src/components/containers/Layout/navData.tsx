import { Kitchen, Restaurant, Search } from "@mui/icons-material";

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

export default navData;
