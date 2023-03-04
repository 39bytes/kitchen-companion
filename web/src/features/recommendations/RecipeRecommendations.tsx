import { Refresh } from "@mui/icons-material";
import { Box, Button, Fade, FormControl, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import Layout from "src/components/layouts/layout/Layout";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { RecipeCard } from "../recipes/RecipeCard";
import {
  fetchRecommendations,
  selectAllRecipeRecommendations,
} from "./recommendationsSlice";
import { RecRecipeDialog } from "./RecRecipeDialog";

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
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
        {recommendations.map((rec) => (
          <RecipeCard
            key={rec.title}
            recipe={{ _id: rec.id, ...rec }}
            handleClick={handleRecommendationCardClick}
          />
        ))}
      </Box>
    );
  }

  const handleRefreshButtonClick = () => {
    //dispatch(fetchRecommendations());
  };

  return (
    <Layout>
      <Fade in={true} timeout={500}>
        <Box mt={4}>
          <Typography variant="h4">Recipes for you</Typography>
          <FormControl variant="standard">
            <Box display="flex">
              <Button
                type="submit"
                variant="contained"
                size="small"
                onClick={handleRefreshButtonClick}
              >
                <Refresh sx={{ mr: 1 }} />
                Refresh
              </Button>
            </Box>
          </FormControl>
          {recommendationsList}
        </Box>
      </Fade>
      {selectedRecipeId && (
        <RecRecipeDialog
          open={recipeInfoOpen}
          recipeId={selectedRecipeId}
          onClose={handleRecipeInfoDialogClose}
        />
      )}
    </Layout>
  );
};

export default RecipeRecommendations;
