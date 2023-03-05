import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { Check, X } from "react-feather";
import { useAppDispatch } from "src/hooks/reduxHooks";
import * as Yup from "yup";
import { Ingredient } from "../../api/types/userfridge";
import { toTitleCase } from "../../utils/toTitleCase";
import { addNewIngredient } from "./fridgeSlice";
import { SlideTransition } from "src/components/SlideTransition";
import { IngredientForm } from "./IngredientForm";

export const ingredientValidationSchema = Yup.object({
  quantity: Yup.number().positive().max(99999).required("Quantity is required"),
  unit: Yup.string().required("Unit is required"),
});

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
  const dispatch = useAppDispatch();

  const initialValues = {
    quantity: 0,
    unit: ingredient.possibleUnits[0],
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          {toTitleCase(ingredient.name)}
        </Box>
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
          await dispatch(addNewIngredient(data));
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
