import { RecipeByIngredientResult } from "../../types/recipe";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
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
        <Typography gutterBottom component="div">
          {recipe.title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
