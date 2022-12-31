import { Box, Fade, FormControl, InputLabel, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import Layout from "src/components/containers/Layout";
import { useAppDispatch, useAppSelector } from "src/hooks";
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
      <Box display="flex" flexWrap="wrap">
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
    <Layout title="Saved Recipes">
      <Fade in={true} timeout={500}>
        <Box>{recipesList}</Box>
      </Fade>
      {recipeInfoDialog}
    </Layout>
  );
};
