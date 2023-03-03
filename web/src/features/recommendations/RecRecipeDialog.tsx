import { AccessTime, Restaurant } from "@mui/icons-material";
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
import {
  addRecipe,
  deleteRecipe,
  selectRecipeBySpoonacularId,
} from "../recipes/recipesSlice";
import { fetchRecipeInfo, selectRecipeInfoById } from "./recipeInfoSlice";
import { BookmarkAdd, BookmarkAddOutlined } from "@mui/icons-material";

type RecRecipeDialogProps = {
  recipeId: number;
  open: boolean;
  onClose: () => void;
};

export const RecRecipeDialog = ({
  recipeId,
  open,
  onClose,
}: RecRecipeDialogProps) => {
  const recipe = useAppSelector((state) =>
    selectRecipeInfoById(state, recipeId)
  );
  const dispatch = useAppDispatch();
  const recipeIsSaved = useAppSelector((state) =>
    selectRecipeBySpoonacularId(state, recipeId)
  );

  let content;

  if (!recipe) {
    content = <CenteredSpinner />;
    dispatch(fetchRecipeInfo(recipeId));
  } else {
    const handleSaveButtonClick = async () => {
      await dispatch(addRecipe(recipe));
    };

    const handleUnsaveButtonClick = async () => {
      await dispatch(deleteRecipe(recipe._id));
    };

    content = (
      <Box p={4}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">{recipe.title}</Typography>
              {recipeIsSaved ? (
                <IconButton color="primary" onClick={handleUnsaveButtonClick}>
                  <BookmarkAdd />
                </IconButton>
              ) : (
                <IconButton color="primary" onClick={handleSaveButtonClick}>
                  <BookmarkAddOutlined />
                </IconButton>
              )}
              {/* <Button
                variant="outlined"
                color="primary"
                onClick={handleSaveButtonClick}
                sx={{ ml: 20 }}
              >
                Save
              </Button> */}
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
