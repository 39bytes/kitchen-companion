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
// import { RecipeInfoDialog } from "./RecipeInfoDialog";
import { Add } from "@mui/icons-material";
import { RecipeAddDialog } from "./RecipeAddDialog";
import { SavedRecipeDialog } from "./SavedRecipeDialog";

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
}));

export const Recipes = () => {
  // For recipe dialog
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>();
  const [recipeInfoOpen, setRecipeInfoOpen] = useState(false);

  // For add recipe menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const addRecipeOpen = Boolean(anchorEl);
  const handleRecipeAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRecipeAddClose = () => {
    setAnchorEl(null);
  };

  const handleRecipeAddOptionClick = () => {
    setAnchorEl(null);
    setRecipeAddDialogOpen(true);
  };

  // For add recipe dialog
  const [recipeAddDialogOpen, setRecipeAddDialogOpen] = useState(false);
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
      <Box mt={4} display="flex" flexWrap="wrap">
        {recipes.map((rec) => (
          <RecipeCard
            recipe={rec}
            handleClick={handleRecipeCardClick}
            key={rec.title}
          />
        ))}
      </Box>
    );
  }

  return (
    <Layout>
      <Box display="flex">
        <Typography variant="h4">Saved Recipes</Typography>
        <Box ml="auto" px={4}>
          <StyledButton
            id="add-recipe-button"
            aria-controls={addRecipeOpen ? "recipe-add-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={addRecipeOpen ? "true" : undefined}
            variant="contained"
            startIcon={<Add />}
            onClick={handleRecipeAddClick}
          >
            Add new
          </StyledButton>
          <Menu
            id="add-recipe-menu"
            anchorEl={anchorEl}
            open={addRecipeOpen}
            onClose={handleRecipeAddClose}
            MenuListProps={{
              "aria-labelledby": "add-recipe-button",
            }}
          >
            <MenuItem onClick={handleRecipeAddOptionClick}>
              Import from website
            </MenuItem>
            <MenuItem onClick={handleRecipeAddOptionClick}>
              Add manually
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Fade in={true} timeout={500}>
        {recipesList}
      </Fade>
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
