import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Ingredient,
  IngredientSearchResult,
} from "@backend/types/ingredient-types";
import { getImageUrl } from "../utils/getImageUrl";
import { toTitleCase } from "../utils/toTitleCase";
import IngredientImage from "./IngredientImage";

type IngredientQuantityDialogProps = {
  open: boolean;
  handleClose: (value: Ingredient | undefined) => void;
  ingredient: Ingredient;
};

const IngredientQuantityDialog = ({
  open,
  ingredient,
  handleClose,
}: IngredientQuantityDialogProps) => {
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  const handleUnitChange = (event: SelectChangeEvent) => {
    setUnit(event.target.value);
  };

  useEffect(() => {
    setQuantity(ingredient.quantity);
    setUnit(ingredient.unit || ingredient.possibleUnits[0]);
  }, [open]);

  const onClose = () => {
    // The user decides not to add a new ingredient, so dont add a new item to the fridge
    if (quantity === 0) {
      handleClose(undefined);
      return;
    }

    // Add a new item to the fridge
    const newIngredient = {
      ...ingredient,
      unit,
      quantity,
    };
    setQuantity(0); // Reset quantity for future dialog opens
    handleClose(newIngredient);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{toTitleCase(ingredient.name)}</DialogTitle>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <IngredientImage imageName={ingredient.image} />
        <Container>
          <TextField
            value={quantity}
            size="small"
            type="number"
            InputProps={{ inputProps: { min: 0, max: 99999 } }}
            defaultValue={1}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value));
            }}
          />
          <Select
            defaultValue={ingredient.unit || ingredient.possibleUnits[0]}
            label="Unit"
            onChange={handleUnitChange}
          >
            {ingredient.possibleUnits.map((u) => {
              return <MenuItem value={u}>{u}</MenuItem>;
            })}
          </Select>
        </Container>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          sx={{ width: "auto", my: 1 }}
        >
          Confirm
        </Button>
      </Box>
    </Dialog>
  );
};

export default IngredientQuantityDialog;
