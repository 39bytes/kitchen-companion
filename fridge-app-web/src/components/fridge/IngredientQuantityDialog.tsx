import { FridgeSection, Ingredient } from "@backend/ingredient";
import {
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
import { isFridgeSection } from "src/utils/isFridgeSection";
import { toTitleCase } from "../../utils/toTitleCase";
import IngredientImage from "./IngredientImage";

type IngredientQuantityDialogProps = {
  open: boolean;
  addingNew: boolean;
  handleClose: (value: Ingredient, addingNew: boolean) => void;
  ingredient: Ingredient;
};

export const IngredientQuantityDialog = ({
  open,
  addingNew,
  ingredient,
  handleClose,
}: IngredientQuantityDialogProps) => {
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [section, setSection] = useState<FridgeSection>("pantry");

  const handleUnitChange = (event: SelectChangeEvent) => {
    setUnit(event.target.value);
  };

  const handleSectionChange = (event: SelectChangeEvent) => {
    setSection(event.target.value as FridgeSection);
  };

  useEffect(() => {
    setQuantity(ingredient.quantity);
    setUnit(ingredient.unit || ingredient.possibleUnits[0]);
    setSection(ingredient.section);
  }, [open]);

  const onClose = () => {
    if (!isFridgeSection(section)) {
      setSection("pantry");
    }
    // Add a new item to the fridge
    const newIngredient = {
      ...ingredient,
      unit,
      quantity,
      section,
    };
    setQuantity(0); // Reset quantity for future dialog opens
    handleClose(newIngredient, addingNew);
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
            onChange={(e) => {
              setQuantity(parseInt(e.target.value));
            }}
            sx={{
              width: 100,
            }}
          />
          <Select
            defaultValue={ingredient.unit || ingredient.possibleUnits[0]}
            size="small"
            label="Unit"
            onChange={handleUnitChange}
          >
            {ingredient.possibleUnits.map((u) => {
              return (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              );
            })}
          </Select>
          <Box display="flex" marginTop={1} justifyContent="center">
            <Select
              defaultValue={ingredient.section}
              size="small"
              label="Section"
              onChange={handleSectionChange}
            >
              <MenuItem key="pantry" value="pantry">
                Pantry
              </MenuItem>
              <MenuItem key="fridge" value="fridge">
                Fridge
              </MenuItem>
              <MenuItem key="freezer" value="freezer">
                Freezer
              </MenuItem>
            </Select>
          </Box>
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
