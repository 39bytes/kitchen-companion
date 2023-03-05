import { Ingredient } from "../../api/types/userfridge";
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { toTitleCase } from "../../utils/toTitleCase";
import IngredientImage from "./IngredientImage";

type IngredientSearchResultCardProps = {
  ingredient: Ingredient;
  handleClick: (value: Ingredient) => void;
};

export const IngredientSearchResultCard = ({
  ingredient,
  handleClick,
}: IngredientSearchResultCardProps) => {
  return (
    <ListItem id={ingredient.id.toString()} sx={{ mx: 0 }}>
      <ListItemButton onClick={() => handleClick(ingredient)}>
        <ListItemAvatar>
          <IngredientImage imageName={ingredient.image} />
        </ListItemAvatar>
        <ListItemText>
          <Typography component="div" variant="subtitle1">
            {toTitleCase(ingredient.name)}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
