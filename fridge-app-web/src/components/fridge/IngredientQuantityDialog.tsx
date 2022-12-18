import { FridgeSection, FridgeIngredient } from "@backend/userfridge";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { setDefaultResultOrder } from "dns/promises";
import { useEffect, useReducer, useState } from "react";
import { isFridgeSection } from "src/utils/isFridgeSection";
import { toTitleCase } from "../../utils/toTitleCase";
import IngredientImage from "./IngredientImage";

type IngredientQuantityDialogProps = {
  open: boolean;
  handleClose: (value: FridgeIngredient | undefined) => void;
  ingredient: FridgeIngredient;
  variant: "create" | "edit";
};

export const IngredientQuantityDialog = ({
  open,
  ingredient,
  handleClose,
  variant,
}: IngredientQuantityDialogProps) => {
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [section, setSection] = useState<FridgeSection>("pantry");

  const [deleting, setDeleting] = useState<boolean>(false);

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

  // A bit hacky but it works
  useEffect(() => {
    if (deleting) {
      onClose({}, "");
    }
  }, [deleting]);

  const onClose = (
    event: {},
    reason: "" | "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      setQuantity(0);
      handleClose(undefined);
      return;
    }

    if (!isFridgeSection(section)) {
      setSection("pantry");
    }

    console.log(quantity);
    // Create new ingredient object
    const newIngredient = {
      ...ingredient,
      unit,
      quantity,
      section,
    };

    setDeleting(false);
    setQuantity(0); // Reset quantity for future dialog opens
    handleClose(newIngredient);
  };

  const handleConfirmButtonClick = () => {
    onClose({}, "");
  };

  const handleDeleteButtonClick = () => {
    setQuantity(0);
    setDeleting(true);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          {toTitleCase(ingredient.name)}
          {variant === "edit" ? (
            <IconButton onClick={handleDeleteButtonClick}>
              <Delete />
            </IconButton>
          ) : (
            <></>
          )}
        </Box>
      </DialogTitle>
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
          onClick={handleConfirmButtonClick}
          color="primary"
          variant="contained"
          sx={{ width: "auto", my: 1 }}
        >
          {variant === "create" ? "Add" : "Edit"}
        </Button>
      </Box>
    </Dialog>
  );
};
