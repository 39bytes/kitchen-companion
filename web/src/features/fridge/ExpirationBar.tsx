import { FridgeIngredient } from "@backend/userfridge";
import { Box, Tooltip } from "@mui/material";
import { FillBar } from "src/components/FillBar";
import { msToDurationString } from "src/utils/msToDurationString";

type ExpirationBarProps = {
  ingredient: FridgeIngredient;
};

export const ExpirationBar = ({ ingredient }: ExpirationBarProps) => {
  let expirationTime;
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
  if (!expirationTime) {
    return <Box></Box>;
  }

  let expirationStr: string | undefined;
  const timeLeft = ingredient.dateAdded + expirationTime - Date.now();
  const expirationPercent = (timeLeft / expirationTime) * 100;

  let fillPercent = 0;
  let fillColor = "green";
  if (timeLeft > 0) {
    expirationStr = `Expires in ${msToDurationString(timeLeft)}`;
    fillPercent = expirationPercent;
    if (timeLeft < 1000 * 60 * 60 * 24) {
      fillColor = "red";
    }
  } else {
    expirationStr = "Might be expired";
  }

  return (
    <Box>
      <Tooltip title={expirationStr}>
        <Box component="span">
          <FillBar fillPercent={fillPercent} color={fillColor} width="70%" />
        </Box>
      </Tooltip>
    </Box>
  );
};
