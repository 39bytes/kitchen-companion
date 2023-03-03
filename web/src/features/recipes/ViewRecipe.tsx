import {
  AccessTime,
  Bookmark,
  BookmarkBorder,
  Restaurant,
  Delete,
  Backup,
  ArrowBack,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import Layout from "src/components/layouts/layout/Layout";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { deleteRecipe, selectRecipeById } from "./recipesSlice";

export const ViewRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleDeleteButtonClick = async () => {
    await dispatch(deleteRecipe(recipe._id.toString()));
  };

  return (
    <Layout>
      <Box p={4}>
        {/* <Tooltip title="Back">
          <IconButton onClick={() => navigate("/recipes")}>
            <ArrowBack />
          </IconButton>
        </Tooltip> */}
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">{recipe.title}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" maxWidth={125} mt={0.5}>
              <Button
                href={recipe.sourceUrl}
                target="_blank"
                variant="outlined"
              >
                View Source
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => navigate(`/recipes/edit/${recipe._id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteButtonClick}
                sx={{ mt: 1 }}
              >
                Delete
              </Button>
            </Box>
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
          {recipe.ingredientsList.map((ingredient, index) => (
            <ListItem
              sx={{ display: "list-item", px: 0, py: 0.25 }}
              key={`ingredient${index}`}
            >
              {ingredient}
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Instructions</Typography>
        {recipe.instructionsList ? (
          <ol style={{ paddingLeft: "22px" }}>
            {recipe.instructionsList.map((instruction, index) => (
              <li style={{ marginTop: "6px" }} key={`instruction${index}`}>
                {instruction}
              </li>
            ))}
          </ol>
        ) : (
          <Typography fontStyle="italic">
            Instructions unavailable for this recipe, view source page for
            instructions.
          </Typography>
        )}
      </Box>
    </Layout>
  );
};
