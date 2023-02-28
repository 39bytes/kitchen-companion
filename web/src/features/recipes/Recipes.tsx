import {
  Box,
  Fade,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import Layout from "src/components/layouts/layout/Layout";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import {
  fetchSavedRecipes,
  selectAllRecipes,
  selectRecipeById,
} from "./recipesSlice";
import { RecipeCard } from "./RecipeCard";
import { RecipeInfoDialog } from "./RecipeInfoDialog";

export const Recipes = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<number>();
  const [recipeInfoOpen, setRecipeInfoOpen] = useState(false);

  const recipes = useAppSelector(selectAllRecipes);
  const recipesStatus = useAppSelector((state) => state.recipes.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchSavedRecipes());
    }
  }, [recipesStatus, dispatch]);

  const handleRecipeCardClick = (recipeId: number) => {
    setSelectedRecipeId(recipeId);
    setRecipeInfoOpen(true);
  };
  const handleRecipeInfoDialogClose = () => {
    setRecipeInfoOpen(false);
  };

  let recipesList;

  if (recipesStatus === "loading") {
    recipesList = <CenteredSpinner />;
  } else {
    recipesList = (
      <Box mx={8} mt={4} display="flex" flexWrap="wrap">
        {recipes.map((rec) => (
          <RecipeCard recipe={rec} handleClick={handleRecipeCardClick} />
        ))}
      </Box>
    );
  }

  const recipeInfoDialog = selectedRecipeId ? (
    <RecipeInfoDialog
      open={recipeInfoOpen}
      recipeId={selectedRecipeId}
      onClose={handleRecipeInfoDialogClose}
      recipeInfoSelector={selectRecipeById}
    />
  ) : (
    <></>
  );

  return (
    <Layout>
      <Typography variant="h4">Recipes</Typography>
      <Fade in={true} timeout={500}>
        <Box>{recipesList}</Box>
      </Fade>
      {recipeInfoDialog}
    </Layout>
  );
};
