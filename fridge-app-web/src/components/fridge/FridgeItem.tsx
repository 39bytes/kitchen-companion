import { Ingredient } from "@backend/ingredient";
import { AcUnit } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { timeBetween } from "src/utils/timeBetween";
import { getImageUrl } from "../../utils/getImageUrl";
import { toTitleCase } from "../../utils/toTitleCase";
import AddRemoveButton from "../buttons/AddRemoveButton";

type FridgeItemProps = {
  ingredient: Ingredient;
  onAddButtonClick: (ingredient: Ingredient) => void;
};

const FridgeItem = ({ ingredient, onAddButtonClick }: FridgeItemProps) => {
  let expirationTime: number = -1;
  if (ingredient.expirationData) {
    switch (ingredient.section) {
      case "pantry":
        expirationTime = ingredient.expirationData.pantry;
        break;
      case "fridge":
        expirationTime = ingredient.expirationData.fridge;
        break;
      case "freezer":
        expirationTime = ingredient.expirationData.freezer;
        break;
    }
  }
  let expiresIn: string | undefined;

  if (expirationTime !== -1) {
    expiresIn = `Expires in ${timeBetween(
      Date.now(),
      ingredient.dateAdded + expirationTime
    )}`;
  }

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
                {`${ingredient.quantity} ${ingredient.unit}${
                  ingredient.quantity !== 1 ? "s" : "" //plural
                }`}
              </Typography>
            </Typography>
          }
          secondary={expiresIn ?? ""}
        />
      </ListItem>
    </>
  );
};

export default FridgeItem;
