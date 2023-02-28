import { FridgeIngredient } from "../../api/types/userfridge";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AddRemoveButton from "../../components/buttons/AddRemoveButton";
import { getImageUrl } from "../../utils/getImageUrl";
import { toTitleCase } from "../../utils/toTitleCase";
import { ExpirationBar } from "./ExpirationBar";

type FridgeItemProps = {
  ingredient: FridgeIngredient;
  onAddButtonClick: (ingredientId: string) => void;
};

const FridgeItem = ({ ingredient, onAddButtonClick }: FridgeItemProps) => {
  return (
    <ListItem
      secondaryAction={
        <AddRemoveButton
          onClick={() => onAddButtonClick(ingredient._id.toString())}
        />
      }
    >
      <ListItemAvatar>
        <Avatar src={getImageUrl(ingredient.image)} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box component="span">
            <Typography
              noWrap
              width="80%"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {toTitleCase(ingredient.name)}
              <Typography variant="caption" sx={{ ml: 0.5, display: "inline" }}>
                {`${ingredient.quantity} ${ingredient.unit}`}
              </Typography>
            </Typography>
          </Box>
        }
        secondary={<ExpirationBar ingredient={ingredient} />}
      />
    </ListItem>
  );
};

export default FridgeItem;
