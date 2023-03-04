import { AccessTime, Restaurant } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";

type RecipeCardProps<T = string | number> = {
  recipe: {
    _id: Extract<T, string | number>;
    title: string;
    image: string;
    servings?: number;
    readyInMinutes?: number;
  };
  handleClick: (recipeId: Extract<T, string | number>) => void;
};

export const RecipeCard = <T extends string | number>({
  recipe,
  handleClick,
}: RecipeCardProps<T>) => {
  return (
    <Card
      sx={{
        width: 144,
        height: 144,
        my: 1,
        mx: 1,
        position: "relative",
        borderRadius: 4,
      }}
      elevation={0}
    >
      <CardActionArea onClick={() => handleClick(recipe._id)}>
        <CardMedia
          sx={{ height: 144, filter: "brightness(65%)" }}
          image={recipe.image}
          title={recipe.title}
        />
        <Box position="absolute" color="white" bottom={8} left={8} width={132}>
          <Typography
            variant="subtitle2"
            noWrap
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {recipe.title}
          </Typography>
          <Box display="flex" color="neutral.300" alignItems="center" mr={1}>
            <AccessTime sx={{ mr: 0.5, fontSize: "14px" }} />
            <Typography variant="subtitle2" fontWeight={500}>
              {recipe.readyInMinutes} min
            </Typography>
          </Box>
        </Box>
        {/* <CardContent sx={{ height: 40 }}>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="h6"
              height="inherit"
              gutterBottom
              overflow="hidden"
              textOverflow="ellipsis"
              {...(recipe.readyInMinutes && recipe.servings
                ? { ...{ noWrap: true } }
                : {})}
              fontSize={
                recipe.readyInMinutes && recipe.servings
                  ? "1rem"
                  : "h6.fontSize"
              }
            >
              {recipe.title}
            </Typography>
            {recipe.readyInMinutes && recipe.servings && (
              <Box display="flex" mx="auto" mb={1}>
                <Box display="flex" alignItems="center" mr={1}>
                  <AccessTime sx={{ mr: 0.5 }} />
                  <Typography variant="subtitle2">
                    {recipe.readyInMinutes} minutes
                  </Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    "& .MuiDivider-root": {
                      backgroundColor: "#000000",
                    },
                  }}
                />
                <Box display="flex" alignItems="center" ml={1}>
                  <Restaurant sx={{ mr: 0.5 }} />
                  <Typography variant="subtitle2">
                    Serves {recipe.servings}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </CardContent> */}
      </CardActionArea>
    </Card>
  );
};
