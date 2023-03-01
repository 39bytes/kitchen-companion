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

type RecipeCardProps = {
  recipe: { _id: string; title: string; image: string };
  handleClick: (recipeId: string) => void;
};

export const RecipeCard = ({ recipe, handleClick }: RecipeCardProps) => {
  return (
    <Card sx={{ width: 240, height: 240, my: 1, mx: 1 }} elevation={1}>
      <CardActionArea onClick={() => handleClick(recipe._id)}>
        <CardMedia
          sx={{ height: 160 }}
          image={recipe.image}
          title={recipe.title}
        />
        <CardContent sx={{ height: 80 }}>
          <Box display="flex" flexDirection="column">
            <Box height={30} textOverflow="ellipsis">
              <Typography
                variant="h6"
                textAlign="center"
                height="inherit"
                gutterBottom
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {recipe.title}
              </Typography>
            </Box>
            <Box display="flex" mx="auto" mb={1}>
              <Box display="flex" alignItems="center" mr={1}>
                <AccessTime sx={{ mr: 0.5 }} />
                <Typography variant="subtitle2">20 minutes</Typography>
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
                <Typography variant="subtitle2">Serves 4</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
