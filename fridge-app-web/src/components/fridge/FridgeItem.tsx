import { Ingredient } from "@backend/ingredient";
import { AcUnit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  TooltipProps,
  Typography,
  useTheme,
} from "@mui/material";
import { forwardRef } from "react";
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
  console.log(ingredient.name, expirationPercent);

  if (expirationTime !== -1) {
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
          secondary={
            <Box>
              {expirationStr}{" "}
              {expirationTime !== -1 && (
                <Tooltip title={expirationStr}>
                  <Box
                    sx={{
                      display: "inline-block",
                      bgcolor: theme.palette.secondary.light,
                      width: "40%",
                      height: 4,
                      boxSizing: "border-box",
                      ml: 1,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "green",
                        width: `${expirationPercent}%`,
                        height: "100%",
                      }}
                    ></Box>
                  </Box>
                </Tooltip>
              )}
            </Box>
          }
        />
      </ListItem>
    </>
  );
};

export default FridgeItem;
