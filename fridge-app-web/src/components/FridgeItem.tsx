import { AcUnit, Add, Remove } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Ingredient } from "@backend/types/ingredient-types";
import { getImageUrl } from "../utils/getImageUrl";
import { toTitleCase } from "../utils/toTitleCase";
import AddRemoveButton from "./AddRemoveButton";

type FridgeItemProps = {
  ingredient: Ingredient;
  onAddButtonClick: (ingredient: Ingredient) => void;
};

const FridgeItem = ({ ingredient, onAddButtonClick }: FridgeItemProps) => {
  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <AddRemoveButton onClick={() => onAddButtonClick(ingredient)} />
            <IconButton edge="end" aria-label="Freeze">
              <AcUnit color="secondary" />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar src={getImageUrl(ingredient.image)} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography>
              {toTitleCase(ingredient.name)}
              <Typography variant="caption" sx={{ ml: 0.5, display: "inline" }}>
                {`${ingredient.quantity} ${ingredient.unit}`}
              </Typography>
            </Typography>
          }
          secondary="Expires in..."
        />
      </ListItem>
    </>
  );
};

export default FridgeItem;
