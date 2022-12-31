import recipeModel, { Recipe } from "@backend/recipe";
import { Box, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import Layout from "src/components/containers/Layout";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { RecipeInfoDialog } from "../recipes/RecipeInfoDialog";
import { selectRecipeInfoById } from "./recipeInfoSlice";
import { RecipeCard } from "../recipes/RecipeCard";
import {
  fetchRecommendations,
  selectAllRecipeRecommendations,
} from "./recommendationsSlice";

const RecipeRecommendations = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<number>();
  const [recipeInfoOpen, setRecipeInfoOpen] = useState(false);

  const recommendations = useAppSelector(selectAllRecipeRecommendations);
  const recsStatus = useAppSelector((state) => state.recommendations.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (recsStatus === "idle") {
      dispatch(fetchRecommendations());
    }
  }, [recsStatus, dispatch]);

  const handleRecommendationCardClick = async (recipeId: number) => {
    setSelectedRecipeId(recipeId);
    setRecipeInfoOpen(true);
  };
  const handleRecipeInfoDialogClose = () => {
    setRecipeInfoOpen(false);
  };

  let recommendationsList;

  if (recsStatus === "loading") {
    recommendationsList = <CenteredSpinner />;
  } else {
    recommendationsList = (
      <Box display="flex" flexWrap="wrap">
        {recommendations.map((rec) => (
          <RecipeCard
            recipe={rec}
            handleClick={handleRecommendationCardClick}
          />
        ))}
      </Box>
    );
  }

  const recipeInfoDialog = selectedRecipeId ? (
    <RecipeInfoDialog
      open={recipeInfoOpen}
      recipeId={selectedRecipeId}
      onClose={handleRecipeInfoDialogClose}
      recipeInfoSelector={selectRecipeInfoById}
    />
  ) : (
    <></>
  );

  return (
    <Layout title="Recommendations based on what's in your fridge">
      <Fade in={true} timeout={500}>
        <Box>
          {/* <Typography variant="h6">
            Recommendations based on what's in your fridge
          </Typography> */}
          {recommendationsList}
        </Box>
      </Fade>
      {recipeInfoDialog}
    </Layout>
  );
};

export default RecipeRecommendations;
