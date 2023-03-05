import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { useEffect } from "react";
import { ArrowLeft, Bookmark, ExternalLink } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import Layout from "src/components/layouts/layout/Layout";
import { LoadingScreen } from "src/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { RecipeInfo } from "../recipes/RecipeInfo";
import {
  addRecipe,
  deleteRecipe,
  selectRecipeBySpoonacularId,
} from "../recipes/recipesSlice";
import { fetchRecipeInfo, selectRecipeInfoById } from "./recipeInfoSlice";

export const ViewRecommendation = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const id = parseInt(recipeId!);

  const recipe = useAppSelector((state) => selectRecipeInfoById(state, id));
  const recipeIsSaved = useAppSelector((state) =>
    selectRecipeBySpoonacularId(state, id)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let content;

  if (!recipe) {
    dispatch(fetchRecipeInfo(parseInt(recipeId!)));
    content = <LoadingScreen />;
  } else {
    const handleSaveButtonClick = async () => {
      await dispatch(addRecipe(recipe));
    };

    const handleUnsaveButtonClick = async () => {
      await dispatch(deleteRecipe(recipe._id));
    };

    const iconsMenu = (
      <Box position="relative" right={16} my={1}>
        <Box display="flex" justifyContent="space-between">
          <Tooltip title="Back">
            <IconButton onClick={() => navigate("/recommendations")}>
              <ArrowLeft />
            </IconButton>
          </Tooltip>
          <Box
            display="flex"
            justifyContent="center"
            position="relative"
            left={32}
          >
            <Tooltip title="View Source">
              <IconButton href={recipe.sourceUrl} target="_blank">
                <ExternalLink />
              </IconButton>
            </Tooltip>
            {!recipeIsSaved ? (
              <Tooltip title="Save">
                <IconButton onClick={handleSaveButtonClick}>
                  <Bookmark />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Unsave">
                <IconButton onClick={handleUnsaveButtonClick}>
                  <Bookmark fill={theme.palette.grey[600]} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
    );

    content = (
      <>
        {iconsMenu}
        <RecipeInfo recipe={recipe} />
      </>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: { xl: 2 } }}>{content}</Box>
    </Layout>
  );
};
