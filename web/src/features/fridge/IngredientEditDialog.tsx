import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { Delete, Trash2 } from "react-feather";
import { SlideTransition } from "src/components/SlideTransition";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { toTitleCase } from "../../utils/toTitleCase";
import {
  deleteIngredient,
  selectFridgeIngredientById,
  updateIngredient,
} from "./fridgeSlice";
import { ingredientValidationSchema } from "./IngredientAddDialog";
import { IngredientForm } from "./IngredientForm";

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
  const ingredient = useAppSelector((state) =>
    selectFridgeIngredientById(state, ingredientId)
  )!;
  const dispatch = useAppDispatch();

  const initialValues = {
    quantity: ingredient.quantity,
    unit: ingredient.unit,
  };

  const handleDeleteButtonClick = () => {
    handleClose();
    dispatch(deleteIngredient(ingredientId));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">{toTitleCase(ingredient.name)}</Typography>
          <IconButton
            onClick={handleDeleteButtonClick}
            sx={{ ml: 3, mb: 1, p: 0 }}
          >
            <Trash2 />
          </IconButton>
        </Box>{" "}
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={ingredientValidationSchema}
        validateOnChange={false}
        onSubmit={async (values, actions) => {
          const data = {
            ingredientData: ingredient,
            quantity: values.quantity,
            unit: values.unit,
          };
          handleClose();
          await dispatch(
            updateIngredient({
              ingredientId: ingredient._id.toString(),
              ...data,
            })
          );
          actions.setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <IngredientForm
            ingredient={ingredient}
            handleClose={handleClose}
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
          />
        )}
      </Formik>
    </Dialog>
  );
};
