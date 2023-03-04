import { AccessTime, Restaurant } from "@mui/icons-material";
import { Box, List, ListItem, Typography } from "@mui/material";
import { Recipe } from "src/api/types/recipe";
import { SubInfo } from "src/components/SubInfo";
import Image from "mui-image";

type RecipeInfoProps = {
  recipe: Recipe;
};

export const RecipeInfo = ({ recipe }: RecipeInfoProps) => {
  return (
    <>
      <Box>
        <Typography variant="h5" textAlign="center">
          {recipe.title}
        </Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <SubInfo
            icon={<AccessTime sx={{ fontSize: "14px" }} />}
            text={`${recipe.readyInMinutes} min`}
          />
          <SubInfo
            icon={<Restaurant sx={{ fontSize: "14px" }} />}
            text={`${recipe.servings} servings`}
            ml={2}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Image
            height={300}
            width={300}
            src={recipe.image}
            duration={200}
            style={{
              borderRadius: 16,
            }}
          />
        </Box>
      </Box>
      <Typography variant="h6" mt={2}>
        Ingredients
      </Typography>
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
    </>
  );
};
