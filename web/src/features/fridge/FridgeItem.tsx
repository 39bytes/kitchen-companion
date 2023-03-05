import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { FridgeIngredient } from "../../api/types/userfridge";
import { getImageUrl } from "../../utils/getImageUrl";
import { toTitleCase } from "../../utils/toTitleCase";

type FridgeItemProps = {
  ingredient: FridgeIngredient;
  onAddButtonClick: (ingredientId: string) => void;
};

const FridgeItem = ({ ingredient, onAddButtonClick }: FridgeItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => onAddButtonClick(ingredient._id.toString())}
      >
        <ListItemAvatar>
          <Avatar src={getImageUrl(ingredient.image)} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box component="span" display="flex">
              <Typography
                noWrap
                maxWidth="75%"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {toTitleCase(ingredient.name)}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  ml: "auto",
                  display: "inline",
                  color: "neutral.700",
                }}
              >
                {`${ingredient.quantity} ${ingredient.unit}`}
              </Typography>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default FridgeItem;
