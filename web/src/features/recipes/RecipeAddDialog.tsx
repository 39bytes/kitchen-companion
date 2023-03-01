import { Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks/reduxHooks";
import { saveRecipe } from "./recipesSlice";
import * as Yup from "yup";

type RecipeAddDialogProps = {
  open: boolean;
  onClose: () => void;
};

const validationSchema = Yup.object({
  title: Yup.string().required("Recipe name is required"),
  sourceUrl: Yup.string().url("Must be a valid URL"),
  servings: Yup.number().positive().integer("Must be a positive number"),
  readyInMinutes: Yup.number().positive().integer("Must be a positive number"),
});

const initialValues = {
  title: "",
  sourceUrl: "",
  servings: 1,
  readyInMinutes: 30,
  ingredients: [""],
  instructions: [""],
};

export const RecipeAddDialog = ({ open, onClose }: RecipeAddDialogProps) => {
  // For handling input in the ingredients and instructions fields
  const [ingredientsLength, setIngredientsLength] = useState(1);
  const [instructionsLength, setInstructionsLength] = useState(1);

  const handleIngredientFieldKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    push: (obj: any) => void,
    length: number
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      push("");
      setIngredientsLength(length);
    }
  };

  const handleInstructionFieldKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    push: (obj: any) => void,
    length: number
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      push("");
      setInstructionsLength(length);
    }
  };

  useEffect(() => {
    const node = document.getElementById(`ingredients.${ingredientsLength}`);
    node?.focus();
    if (node !== null) {
      node.innerText = "";
    }
  }, [ingredientsLength]);

  useEffect(() => {
    const node = document.getElementById(`instructions.${instructionsLength}`);
    node?.focus();
    if (node !== null) {
      node.innerText = "";
    }
  }, [instructionsLength]);

  // Redux state
  const dispatch = useAppDispatch();

  return (
    <Dialog open={open} maxWidth="lg" onClose={onClose}>
      <Box p={4}>
        <Typography variant="h5" color="primary">
          New Recipe
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          onSubmit={async (values) => {
            dispatch(
              saveRecipe({
                title: values.title,
                sourceUrl: values.sourceUrl ?? undefined,
                servings: values.servings ?? undefined,
                readyInMinutes: values.readyInMinutes ?? undefined,
                ingredientsList: values.ingredients,
                instructionsList: values.instructions,
              })
            );
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Box display="flex" alignItems="center" minWidth={500}>
                <TextField
                  fullWidth
                  id="source"
                  name="sourceUrl"
                  variant="standard"
                  placeholder="Enter a URL to parse recipe info from automatically"
                  value={values.sourceUrl}
                  onChange={handleChange}
                  error={touched.sourceUrl && Boolean(errors.sourceUrl)}
                  helperText={touched.sourceUrl && errors.sourceUrl}
                  sx={{ mt: 2, mb: 2 }}
                />
                <Button variant="outlined" sx={{ height: 32, ml: 2 }}>
                  Import
                </Button>
              </Box>
              <Typography
                component="p"
                variant="overline"
                sx={{ fontSize: "0.9rem" }}
              >
                Recipe Info
              </Typography>
              <TextField
                variant="standard"
                fullWidth
                id="name"
                name="title"
                label="Name"
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{ mb: 2 }}
              />
              <FormGroup>
                <Box mt={1}>
                  <TextField
                    id="servings"
                    name="servings"
                    label="Servings"
                    size="small"
                    variant="standard"
                    value={values.servings}
                    onChange={handleChange}
                    error={touched.servings && Boolean(errors.servings)}
                    helperText={touched.servings && errors.servings}
                    sx={{
                      mr: 2,
                      maxWidth: 100,
                    }}
                  />
                  <TextField
                    sx={{
                      maxWidth: 100,
                    }}
                    id="readyInMinutes"
                    name="readyInMinutes"
                    label="Ready in"
                    size="small"
                    variant="standard"
                    value={values.readyInMinutes}
                    onChange={handleChange}
                    error={
                      touched.readyInMinutes && Boolean(errors.readyInMinutes)
                    }
                    helperText={touched.readyInMinutes && errors.readyInMinutes}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mins</InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <FieldArray name="ingredients">
                  {({ push, remove }) => (
                    <Box mt={2}>
                      <Typography variant="overline">Ingredients</Typography>
                      {values.ingredients.map((ingredient, index) => (
                        <Box key={index} mt={1} display="flex">
                          <TextField
                            fullWidth
                            id={`ingredients.${index}`}
                            name={`ingredients.${index}`}
                            variant="standard"
                            value={ingredient}
                            onChange={handleChange}
                            error={
                              touched.ingredients && Boolean(errors.ingredients)
                            }
                            helperText={
                              touched.ingredients && errors.ingredients
                            }
                            onKeyDown={(e) => {
                              handleIngredientFieldKeyDown(
                                e,
                                push,
                                values.ingredients.length
                              );
                            }}
                            sx={{ mt: 1 }}
                          />
                          <IconButton
                            color="error"
                            onClick={() => remove(index)}
                          >
                            <Remove />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}
                </FieldArray>
                <FieldArray name="instructions">
                  {({ push, remove }) => (
                    <Box mt={2}>
                      <Typography variant="overline">Instructions</Typography>
                      {values.instructions.map((instruction, index) => (
                        <Box key={index} mt={1} display="flex">
                          <TextField
                            fullWidth
                            id={`instructions.${index}`}
                            name={`instructions.${index}`}
                            variant="standard"
                            value={instruction}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  sx={{ mb: "auto", mt: 1.5 }}
                                >
                                  {`${index + 1}.`}
                                </InputAdornment>
                              ),
                            }}
                            multiline
                            error={
                              touched.instructions &&
                              Boolean(errors.instructions)
                            }
                            helperText={
                              touched.instructions && errors.instructions
                            }
                            onKeyDown={(e) => {
                              handleInstructionFieldKeyDown(
                                e,
                                push,
                                values.instructions.length
                              );
                            }}
                            sx={{ mt: 1 }}
                          />
                          <IconButton
                            color="error"
                            onClick={() => remove(index)}
                          >
                            <Remove />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}
                </FieldArray>
              </FormGroup>
              <Button type="submit">Save</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};
