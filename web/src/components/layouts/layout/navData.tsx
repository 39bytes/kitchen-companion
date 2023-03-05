import { Kitchen, Restaurant, Search } from "@mui/icons-material";

const navData = [
  {
    title: "My Ingredients",
    path: "/fridge",
    icon: <Kitchen />,
  },
  {
    title: "Saved Recipes",
    path: "/recipes",
    icon: <Restaurant />,
  },
  {
    title: "Recommendations",
    path: "/recommendations",
    icon: <Search />,
  },
];

export default navData;
