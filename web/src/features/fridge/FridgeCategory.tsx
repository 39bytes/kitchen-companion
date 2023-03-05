import { Box, Collapse, List, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";
import {
  GiCannedFish,
  GiCheeseWedge,
  GiCube,
  GiFlour,
  GiIceCube,
  GiKetchup,
  GiMeat,
  GiMilkCarton,
  GiSaltShaker,
} from "react-icons/gi";
import { TransitionGroup } from "react-transition-group";
import { toTitleCase } from "src/utils/toTitleCase";
import { FridgeIngredient } from "../../api/types/userfridge";
import FridgeItem from "./FridgeItem";

import {
  faBreadSlice,
  faCarrot,
  faOilCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const iconMap = new Map<string, ReactNode>([
  ["Meat", <GiMeat />],
  ["Spices and Seasonings", <GiSaltShaker />],
  ["Cheese", <GiCheeseWedge />],
  ["Baking", <GiFlour />],
  ["Bakery/Bread", <FontAwesomeIcon icon={faBreadSlice} />],
  ["Produce", <FontAwesomeIcon icon={faCarrot} />],
  ["Milk, Eggs, Other Dairy", <GiMilkCarton />],
  ["Canned and Jarred", <GiCannedFish />],
  ["Oil, Vinegar, Salad Dressing", <FontAwesomeIcon icon={faOilCan} />],
  ["Condiments", <GiKetchup />],
  ["Frozen", <GiCube />],
]);

const iconProps = { style: { marginRight: "8px" }, size: 24 };

type FridgeCategoryProps = {
  name: string;
  items: FridgeIngredient[];
  onAddButtonClick: (ingredientId: string) => void;
};

const FridgeCategory = ({
  name,
  items,
  onAddButtonClick,
}: FridgeCategoryProps) => {
  const icon = iconMap.get(name) ?? <FontAwesomeIcon icon={faCarrot} />;
  const theme = useTheme();

  return (
    <Box>
      <Box>
        <Typography
          variant="h6"
          color={theme.palette.neutral.light}
          textAlign="left"
          mt={2}
          sx={{ px: 2 }}
        >
          <Box display="inline-flex" alignItems="center">
            {icon && (
              <Box component="span" {...iconProps}>
                {icon}
              </Box>
            )}
            {toTitleCase(name)}
          </Box>
        </Typography>
      </Box>
      <List>
        <TransitionGroup>
          {items.map((item) => (
            <Collapse key={`${item.id}-${item.dateAdded}`}>
              <FridgeItem
                key={`${item.id}-${item.dateAdded}`}
                ingredient={item}
                onAddButtonClick={onAddButtonClick}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
};

export default FridgeCategory;
