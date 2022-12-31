import { FridgeSection, Ingredient } from "@backend/userfridge";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks";
import { isFridgeSection } from "src/utils/isFridgeSection";
import { toTitleCase } from "../../utils/toTitleCase";
import { addNewIngredient } from "./fridgeSlice";
import IngredientImage from "./IngredientImage";
import { SectionSelect } from "./SectionSelect";
import { UnitSelect } from "./UnitSelect";

type IngredientAddDialogProps = {
  open: boolean;
  handleClose: () => void;
  ingredient: Ingredient;
};

export const IngredientAddDialog = ({
  open,
  ingredient,
  handleClose,
}: IngredientAddDialogProps) => {
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [section, setSection] = useState<FridgeSection>("pantry");

  const dispatch = useAppDispatch();

  const handleUnitChange = (event: SelectChangeEvent) => {
    setUnit(event.target.value);
  };

  const handleSectionChange = (event: SelectChangeEvent) => {
    setSection(event.target.value as FridgeSection);
  };

  useEffect(() => {
    setQuantity(0);
    setUnit(ingredient.possibleUnits[0]);
    setSection("pantry");
  }, [open, ingredient.possibleUnits]);

  const canSave = quantity > 0;

  const onClose = async (
    event: {},
    reason: "" | "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      handleClose();
      return;
    }
    if (canSave) {
      try {
        if (!isFridgeSection(section)) {
          setSection("pantry");
        }

        await dispatch(
          addNewIngredient({
            ingredientData: ingredient,
            quantity,
            unit,
            section,
          })
        ).unwrap();
      } catch (err) {
        console.error(err);
      } finally {
        handleClose();
      }
    }
  };

  const QuantityField = (
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
  );

  const AddButton = () => (
    <Button
      onClick={() => onClose({}, "")}
      color="primary"
      variant="contained"
      disabled={!canSave}
      sx={{ width: "auto", my: 1 }}
    >
      Add
    </Button>
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          {toTitleCase(ingredient.name)}
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
          {QuantityField}
          <UnitSelect
            onChange={handleUnitChange}
            units={ingredient.possibleUnits}
            defaultValue={ingredient.possibleUnits[0]}
          />
          <Box display="flex" marginTop={1} justifyContent="center">
            <SectionSelect value={section} onChange={handleSectionChange} />
          </Box>
          <AddButton />
        </Container>
      </Box>
    </Dialog>
  );
};
