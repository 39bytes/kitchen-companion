import { Box, Fade, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect } from "react";
import { RefreshCcw } from "react-feather";
import { useNavigate } from "react-router-dom";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import Layout from "src/components/layouts/layout/Layout";
import { LoadingScreen } from "src/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { RecipeCard } from "../recipes/RecipeCard";
import {
  fetchRecommendations,
  selectAllRecipeRecommendations,
} from "./recommendationsSlice";

const RecipeRecommendations = () => {
  const navigate = useNavigate();

  const recommendations = useAppSelector(selectAllRecipeRecommendations);
  const recsStatus = useAppSelector((state) => state.recommendations.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (recsStatus === "idle") {
      dispatch(fetchRecommendations());
    }
  }, [recsStatus, dispatch]);

  let recommendationsList;

  if (recsStatus === "loading") {
    recommendationsList = <LoadingScreen height="60vh" />;
  } else {
    recommendationsList = (
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
        {recommendations.map((rec) => (
          <RecipeCard
            key={rec.title}
            recipe={{ _id: rec.id, ...rec }}
            handleClick={() => navigate(`/recommendations/info/${rec.id}`)}
          />
        ))}
      </Box>
    );
  }

  const handleRefreshButtonClick = () => {
    dispatch(fetchRecommendations());
  };

  return (
    <Layout>
      <Fade in={true} timeout={500}>
        <Box mt={4}>
          <Box display="flex" mb={4}>
            <Typography variant="h4">Recipes for you</Typography>
            <Tooltip title="Refresh">
              <IconButton sx={{ ml: 1 }} onClick={handleRefreshButtonClick}>
                <RefreshCcw />
              </IconButton>
            </Tooltip>
          </Box>
          {recommendationsList}
        </Box>
      </Fade>
    </Layout>
  );
};

export default RecipeRecommendations;
