import { Box, Collapse, List, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Ingredient } from "@backend/ingredient";
import FridgeItem from "./FridgeItem";
import { toTitleCase } from "src/utils/toTitleCase";
import { TransitionGroup } from "react-transition-group";

type FridgeCategoryProps = {
  name: string;
  items: Ingredient[];
  onAddButtonClick: (ingredient: Ingredient) => void;
};

const FridgeCategory = ({
  name,
  items,
  onAddButtonClick,
}: FridgeCategoryProps) => {
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
          {toTitleCase(name)}
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
