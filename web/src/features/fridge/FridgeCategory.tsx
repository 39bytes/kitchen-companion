import { Box, Collapse, List, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import { FridgeIngredient } from "../../types/userfridge";
import FridgeItem from "./FridgeItem";
import { toTitleCase } from "src/utils/toTitleCase";
import { TransitionGroup } from "react-transition-group";
import {
  GiMeat,
  GiSaltShaker,
  GiCheeseWedge,
  GiFlour,
  GiBreadSlice,
  GiCarrot,
  GiMilkCarton,
  GiCannedFish,
  GiKetchup,
} from "react-icons/gi";

import {
  faCarrot,
  faBreadSlice,
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
  const icon = iconMap.get(name);
  return (
    <Box>
      <Box>
        <Typography
          variant="h6"
          color="primary"
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
