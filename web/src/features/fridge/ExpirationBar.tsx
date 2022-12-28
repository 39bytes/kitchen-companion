import { FridgeIngredient } from "@backend/userfridge";
import { Box, Tooltip } from "@mui/material";
import { FillBar } from "src/components/FillBar";
import { msToDurationString } from "src/utils/msToDurationString";

type ExpirationBarProps = {
  ingredient: FridgeIngredient;
};

export const ExpirationBar = ({ ingredient }: ExpirationBarProps) => {
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
    <Box>
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
  );
};
