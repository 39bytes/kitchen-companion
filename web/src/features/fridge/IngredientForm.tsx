import { Box, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { Form, FormikErrors, FormikTouched } from "formik";
import { Check, X } from "react-feather";
import { Ingredient } from "src/api/types/userfridge";

type IngredientFormState = {
  quantity: number;
  unit: string;
};

type IngredientFormProps = {
  ingredient: Ingredient;
  handleClose: () => void;
  values: IngredientFormState;
  errors: FormikErrors<IngredientFormState>;
  touched: FormikTouched<IngredientFormState>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
};

export const IngredientForm = ({
  ingredient,
  handleClose,
  values,
  errors,
  touched,
  handleChange,
}: IngredientFormProps) => (
  <Form>
    <Box
      px={3}
      pb={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box display="flex" justifyContent="center">
        <TextField
          id="quantity"
          name="quantity"
          value={values.quantity}
          size="small"
          InputProps={{ inputProps: { min: 0, max: 99999 } }}
          sx={{ width: 65 }}
          onChange={handleChange}
          error={touched.quantity && Boolean(errors.quantity)}
        />
        <Select
          id="unit"
          name="unit"
          label="Unit"
          value={values.unit}
          size="small"
          sx={{ width: 100 }}
          onChange={handleChange}
          error={touched.unit && Boolean(errors.unit)}
        >
          {ingredient.possibleUnits.map((u) => {
            return (
              <MenuItem key={u} value={u}>
                {u}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <Box
        display="flex"
        justifyContent="space-evenly"
        mt={1}
        width={150}
        mx="auto"
      >
        <IconButton onClick={handleClose}>
          <X />
        </IconButton>
        <IconButton type="submit">
          <Check />
        </IconButton>
      </Box>
    </Box>
  </Form>
);
