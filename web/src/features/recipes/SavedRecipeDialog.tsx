import {
  AccessTime,
  Bookmark,
  BookmarkBorder,
  Restaurant,
  Delete,
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
import Image from "mui-image";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
// import {
//   fetchRecipeInfo,
//   selectRecipeInfoById,
// } from "../recommendations/recipeInfoSlice";
import { deleteRecipe, selectRecipeById } from "./recipesSlice";

type SavedRecipeDialogProps = {
  recipeId: string;
  open: boolean;
  onClose: () => void;
};

export const SavedRecipeDialog = ({
  recipeId,
  open,
  onClose,
}: SavedRecipeDialogProps) => {
  const recipe = useAppSelector((state) => selectRecipeById(state, recipeId));
  const dispatch = useAppDispatch();

  let content;

  if (!recipe) {
    content = <CenteredSpinner />;
  } else {
    const handleDeleteButtonClick = async () => {
      onClose();
      await dispatch(deleteRecipe(recipe._id.toString()));
    };

    content = (
      <Box p={4}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box display="flex">
              <Typography variant="h5">{recipe.title}</Typography>
              <IconButton onClick={handleDeleteButtonClick}>
                <Delete />
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
          {recipe.ingredientsList.map((ingredient) => (
            <ListItem sx={{ display: "list-item", px: 0, py: 0.25 }}>
              {ingredient}
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
