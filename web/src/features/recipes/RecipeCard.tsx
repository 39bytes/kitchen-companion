import { AccessTime } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Card
      sx={{
        width: {
          xs: 144,
          xl: 200,
        },
        height: {
          xs: 144,
          xl: 200,
        },
        my: 1,
        mx: 1,
        position: "relative",
        borderRadius: 4,
      }}
      elevation={0}
    >
      <CardActionArea onClick={() => handleClick(recipe._id)}>
        <CardMedia
          sx={{ height: { xs: 144, xl: 200 }, filter: "brightness(65%)" }}
          image={recipe.image}
          title={recipe.title}
        />
        <Box position="absolute" color="white" bottom={8} left={8} width={132}>
          {recipe.readyInMinutes ? (
            <>
              <Typography
                variant="subtitle2"
                noWrap
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {recipe.title}
              </Typography>
              <Box
                display="flex"
                color="neutral.300"
                alignItems="center"
                mr={1}
              >
                <AccessTime sx={{ mr: 0.5, fontSize: "14px" }} />
                <Typography variant="subtitle2" fontWeight={500}>
                  {recipe.readyInMinutes} min
                </Typography>
              </Box>
            </>
          ) : (
            <Typography
              variant="subtitle2"
              maxHeight={44}
              overflow="hidden"
              textOverflow="ellipsis"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {recipe.title}
            </Typography>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};
