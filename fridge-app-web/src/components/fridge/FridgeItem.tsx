import { Ingredient } from "@backend/ingredient";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { msToDurationString } from "src/utils/msToDurationString";
import { getImageUrl } from "../../utils/getImageUrl";
import { toTitleCase } from "../../utils/toTitleCase";
import AddRemoveButton from "../buttons/AddRemoveButton";

type FridgeItemProps = {
  ingredient: Ingredient;
  onAddButtonClick: (ingredient: Ingredient) => void;
};

type FillBarProps = {
  fillPercent: number;
  width: string | number;
  color: string;
};

const FillBar = ({ fillPercent, width, color }: FillBarProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "inline-block",
        bgcolor: theme.palette.grey[200],
        width: width,
        height: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: color,
          width: `${fillPercent}%`,
          height: "100%",
        }}
      ></Box>
    </Box>
  );
};

const FridgeItem = ({ ingredient, onAddButtonClick }: FridgeItemProps) => {
  const theme = useTheme();

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
  const timeLeft = ingredient.dateAdded + expirationTime - Date.now();
  const expirationPercent = (timeLeft / expirationTime) * 100;

  if (expirationTime !== -1) {
    if (timeLeft > 0) {
      expirationStr = `Expires in ${msToDurationString(timeLeft)}`;
    } else {
      expirationStr = "Might be expired";
    }
  }

  return (
    <ListItem
      secondaryAction={
        <AddRemoveButton onClick={() => onAddButtonClick(ingredient)} />
      }
    >
      <ListItemAvatar>
        <Avatar src={getImageUrl(ingredient.image)} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box component="span">
            <Typography sx={{ textOverflow: "ellipsis" }}>
              {toTitleCase(ingredient.name)}
              <Typography variant="caption" sx={{ ml: 0.5, display: "inline" }}>
                {`${ingredient.quantity} ${ingredient.unit}`}
              </Typography>
            </Typography>
          </Box>
        }
        secondary={
          <Box>
            {/* {expirationStr}{" "} */}
            {expirationTime !== -1 && (
              <Tooltip title={expirationStr}>
                <Box component="span">
                  <FillBar
                    fillPercent={expirationPercent}
                    color="green"
                    width="70%"
                  />
                </Box>
              </Tooltip>
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

export default FridgeItem;
