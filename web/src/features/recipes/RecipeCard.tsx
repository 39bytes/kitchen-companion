import { RecipeByIngredientResult } from "../../types/recipe";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { AccessTime, Restaurant } from "@mui/icons-material";
import React from "react";

type RecipeCardProps = {
  recipe: { id: number; title: string; image: string };
  handleClick: (recipeId: number) => void;
};
export const RecipeCard = ({ recipe, handleClick }: RecipeCardProps) => (
  <Card sx={{ width: 250, height: 300, m: 1 }}>
    <CardActionArea onClick={() => handleClick(recipe.id)}>
      <CardMedia
        sx={{ height: 200 }}
        image={recipe.image}
        title={recipe.title}
      />
      <CardContent sx={{ height: 100 }}>
        <Box display="flex" flexDirection="column">
          <Box height={36}>
            <Typography variant="h6" textAlign="center">
              {recipe.title}
            </Typography>
          </Box>
          <Box display="flex">
            <Box display="flex" alignItems="center" mt={2}>
              <AccessTime sx={{ mx: 0.5 }} />
              <Typography>20 minutes</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box display="flex" alignItems="center" mt={2}>
              <Restaurant sx={{ mx: 0.5 }} />
              <Typography>Serves 4</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);
