import { Recipe } from "../../types/recipe";
import {
  AccessTime,
  Bookmark,
  BookmarkBorder,
  Favorite,
  Restaurant,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import { useAppDispatch, useAppSelector } from "src/hooks";
// import { fetchRecipeInfo, selectRecipeById } from "./recipesSlice";
import Image from "mui-image";
import {
  fetchRecipeInfo,
  selectRecipeInfoById,
} from "../recommendations/recipeInfoSlice";
import { RootState } from "src/store";
import { deleteRecipe, saveRecipe, selectRecipeById } from "./recipesSlice";

type RecipeInfoDialogProps = {
  recipeId: number;
  open: boolean;
  onClose: () => void;
  recipeInfoSelector: (
    state: RootState,
    recipeId: number
  ) => Recipe | undefined;
};

export const RecipeInfoDialog = ({
  recipeId,
  open,
  onClose,
  recipeInfoSelector,
}: RecipeInfoDialogProps) => {
  const recipe = useAppSelector((state) => recipeInfoSelector(state, recipeId));
  const recipeIsSaved = useAppSelector((state) =>
    selectRecipeById(state, recipeId)
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!recipe) {
      dispatch(fetchRecipeInfo(recipeId));
    }
  }, [open, recipeId, recipe, dispatch]);

  let content;

  if (!recipe) {
    content = <CenteredSpinner />;
  } else {
    const handleSaveButtonClick = async () => {
      if (!recipeIsSaved) {
        await dispatch(saveRecipe(recipe));
      } else {
        onClose();
        await dispatch(deleteRecipe(recipe.id.toString()));
      }
    };

    content = (
      <Box p={4}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box display="flex">
              <Typography variant="h5">{recipe.title}</Typography>
              <IconButton onClick={handleSaveButtonClick}>
                {recipeIsSaved ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </Box>
            <Button href={recipe.sourceUrl} target="_blank" variant="outlined">
              View Source
            </Button>
            <Box display="flex" alignContent="center" mt={1}>
              <AccessTime />
              <Typography sx={{ ml: 0.5 }}>
                {recipe.readyInMinutes} minutes
              </Typography>
            </Box>
            <Box display="flex" alignContent="center" mt={1}>
              <Restaurant />
              <Typography sx={{ ml: 0.5 }}>
                {recipe.servings} servings
              </Typography>
            </Box>
          </Box>
          <Image height="100%" width={200} duration={200} src={recipe.image} />
        </Box>

        <Typography variant="h6">Ingredients</Typography>
        <List sx={{ listStyleType: "disc", pl: 2.5 }}>
          {recipe.extendedIngredients.map((ingredient) => (
            <ListItem sx={{ display: "list-item", px: 0, py: 0.25 }}>
              {ingredient.original}
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Instructions</Typography>
        {recipe.instructionsList ? (
          <ol style={{ paddingLeft: "22px" }}>
            {recipe.instructionsList.map((instruction) => (
              <li style={{ marginTop: "6px" }}>{instruction}</li>
            ))}
          </ol>
        ) : (
          <Typography fontStyle="italic">
            Instructions unavailable for this recipe, view source page for
            instructions.
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      {content}
    </Dialog>
  );
};
