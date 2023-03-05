import {
  Kitchen,
  Restaurant,
  Search,
  Calculate,
  FormatListBulleted,
} from "@mui/icons-material";

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
  {
    title: "Grocery List",
    path: "/grocery",
    icon: <FormatListBulleted />,
  },
  {
    title: "Unit Converter",
    path: "/converter",
    icon: <Calculate />,
  },
];

export default navData;
