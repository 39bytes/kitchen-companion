import { Box, List, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Ingredient } from "@backend/ingredient";
import FridgeItem from "./FridgeItem";
import { toTitleCase } from "src/utils/toTitleCase";

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
    <Paper elevation={1} sx={{ minWidth: 150 }}>
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
        {items.map((item) => (
          <FridgeItem
            key={`${item.id}-${item.dateAdded}`}
            ingredient={item}
            onAddButtonClick={onAddButtonClick}
          />
        ))}
      </List>
    </Paper>
  );
};

export default FridgeCategory;
