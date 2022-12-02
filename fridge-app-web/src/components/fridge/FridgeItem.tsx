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
import { msToDurationString } from "src/utils/msToDurationString";
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
  let expirationStr: string | undefined;

  if (expirationTime !== -1) {
    const timeLeft = ingredient.dateAdded + expirationTime - Date.now();

    if (timeLeft > 0) {
      expirationStr = `Expires in ${msToDurationString(timeLeft)}`;
    } else {
      expirationStr = "Might be expired";
    }
  }

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <AddRemoveButton onClick={() => onAddButtonClick(ingredient)} />
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
          secondary={expirationStr ?? ""}
        />
      </ListItem>
    </>
  );
};

export default FridgeItem;
