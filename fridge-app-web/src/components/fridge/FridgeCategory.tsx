import { Box, List, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Ingredient } from "@backend/ingredient";
import FridgeItem from "./FridgeItem";

type FridgeCategoryProps = {
  name: string;
  items: Ingredient[];
  color: string;
  icon: ReactNode;
  onAddButtonClick: (ingredient: Ingredient) => void;
};

const FridgeCategory = ({
  name,
  items,
  color,
  icon,
  onAddButtonClick,
}: FridgeCategoryProps) => {
  return (
    <Paper
      elevation={1}
      sx={{ display: "inline-block", width: 400, mx: 2, my: 1 }}
    >
      <Box>
        <Typography variant="h5" textAlign="left" mt={2} sx={{ px: 2 }}>
          {name}
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
