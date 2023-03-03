import {
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import Layout from "src/components/layouts/layout/Layout";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import {
  fetchSavedRecipes,
  selectAllRecipes,
  selectRecipeById,
} from "./recipesSlice";
import { RecipeCard } from "./RecipeCard";
import { Add } from "@mui/icons-material";
import { RecipeAddDialog } from "./RecipeAddDialog";
import { SavedRecipeDialog } from "./SavedRecipeDialog";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  marginTop: theme.spacing(2),
}));

export const Recipes = () => {
  const navigate = useNavigate();
  // For recipe dialog
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>();
  const [recipeInfoOpen, setRecipeInfoOpen] = useState(false);

  const [recipeAddDialogOpen, setRecipeAddDialogOpen] = useState(false);

  const handleRecipeAddClick = () => {
    setRecipeAddDialogOpen(true);
  };
  const handleRecipeAddDialogClose = () => {
    setRecipeAddDialogOpen(false);
  };

  // Redux state
  const recipes = useAppSelector(selectAllRecipes);
  const recipesStatus = useAppSelector((state) => state.recipes.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchSavedRecipes());
    }
  }, [recipesStatus, dispatch]);

  const handleRecipeCardClick = (recipeId: string) => {
    // setSelectedRecipeId(recipeId);
    // setRecipeInfoOpen(true);
    navigate(`/recipes/info/${recipeId}`);
  };
  const handleRecipeInfoDialogClose = () => {
    setRecipeInfoOpen(false);
  };

  let recipesList;

  if (recipesStatus === "loading") {
    recipesList = <CenteredSpinner />;
  } else {
    recipesList = (
      <Box mt={4} display="flex" flexWrap="wrap">
        {recipes.map((rec) => (
          <RecipeCard
            recipe={rec}
            handleClick={handleRecipeCardClick}
            key={rec._id}
          />
        ))}
      </Box>
    );
  }

  return (
    <Layout>
      <Box display="flex" mt={4}>
        <Typography variant="h4">Saved Recipes</Typography>
        <Box ml="auto" px={4}>
          <StyledButton
            id="add-recipe-button"
            variant="contained"
            startIcon={<Add />}
            onClick={handleRecipeAddClick}
          >
            Add new
          </StyledButton>
        </Box>
      </Box>
      {/* <Fade in={true} timeout={500}></Fade> */}
      {recipesList}
      {selectedRecipeId && (
        <SavedRecipeDialog
          open={recipeInfoOpen}
          recipeId={selectedRecipeId}
          onClose={handleRecipeInfoDialogClose}
        />
      )}
      <RecipeAddDialog
        open={recipeAddDialogOpen}
        onClose={handleRecipeAddDialogClose}
      />
    </Layout>
  );
};
