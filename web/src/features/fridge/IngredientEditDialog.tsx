import {
  FridgeIngredient,
  FridgeSection,
  Ingredient,
} from "@backend/userfridge";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { isFridgeSection } from "src/utils/isFridgeSection";
import IngredientImage from "./IngredientImage";
import { toTitleCase } from "../../utils/toTitleCase";
import {
  addNewIngredient,
  deleteIngredient,
  selectFridgeIngredientById,
  updateIngredient,
} from "./fridgeSlice";
import { SectionSelect } from "./SectionSelect";
import { UnitSelect } from "./UnitSelect";
import { Delete } from "@mui/icons-material";

type IngredientEditDialogProps = {
  open: boolean;
  handleClose: () => void;
  ingredientId: string;
};

export const IngredientEditDialog = ({
  open,
  ingredientId,
  handleClose,
}: IngredientEditDialogProps) => {
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [section, setSection] = useState<FridgeSection>("pantry");

  const ingredient = useAppSelector((state) =>
    selectFridgeIngredientById(state, ingredientId)
  )!;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setUnit(ingredient.unit);
    setQuantity(ingredient.quantity);
    setSection(ingredient.section);
  }, [open]);

  if (!ingredient) {
    return <></>;
  }

  const handleUnitChange = (event: SelectChangeEvent) => {
    setUnit(event.target.value);
  };

  const handleSectionChange = (event: SelectChangeEvent) => {
    setSection(event.target.value as FridgeSection);
  };

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
          updateIngredient({ ingredientId, quantity, unit, section })
        ).unwrap();
      } catch (err) {
        console.error(err);
      } finally {
        handleClose();
      }
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      await dispatch(deleteIngredient(ingredientId)).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      handleClose();
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

  const SaveButton = () => (
    <Button
      onClick={() => onClose({}, "")}
      color="primary"
      variant="contained"
      disabled={!canSave}
      sx={{ width: "auto", my: 1 }}
    >
      Save
    </Button>
  );

  const DeleteButton = () => (
    <IconButton onClick={handleDeleteButtonClick} sx={{ ml: 2, p: 0 }}>
      <Delete />
    </IconButton>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          {toTitleCase(ingredient.name)}
          <DeleteButton />
        </Box>
      </DialogTitle>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <IngredientImage imageName={ingredient.image} />
        <Box>
          {QuantityField}
          <UnitSelect
            onChange={handleUnitChange}
            units={ingredient.possibleUnits}
            defaultValue={ingredient.possibleUnits[0]}
          />
        </Box>
        <Box display="flex" marginTop={1} justifyContent="center">
          <SectionSelect
            defaultValue={section}
            onChange={handleSectionChange}
          />
        </Box>
        <SaveButton />
      </Box>
    </Dialog>
  );
};
