import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Fade,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DishType, DishTypes } from "src/api/types/recipe";
import Layout from "src/components/layouts/layout/Layout";
import { LoadingScreen } from "src/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { toTitleCase } from "src/utils/toTitleCase";
import { RecipeCard } from "./RecipeCard";
import { fetchSavedRecipes, selectRecipeByDishType } from "./recipesSlice";

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  marginTop: theme.spacing(2),
}));

const Notch = styled("div")(({ theme }) => ({
  position: "relative",
  left: "50%",
  transform: "translateX(-50%)",
  borderRadius: "25%",
  width: "12px",
  height: "4px",
  backgroundColor: theme.palette.text.primary,
}));

type DishTypeOptionProps = {
  selected: boolean;
  option: DishType;
  setter: (option: DishType) => void;
};

const DishTypeOption = ({ selected, option, setter }: DishTypeOptionProps) => {
  const selectedProps = { fontWeight: 700, color: "neutral.900" };
  return (
    <ButtonBase onClick={() => setter(option)} disableRipple>
      <Typography variant="subtitle1" {...(selected && selectedProps)}>
        {toTitleCase(option)}
        {selected && <Notch />}
      </Typography>
    </ButtonBase>
  );
};

export const Recipes = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [dishType, setDishType] = useState<DishType>("breakfast");

  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  // Redux state
  const recipes = useAppSelector((state) =>
    selectRecipeByDishType(state, dishType)
  );
  const recipesStatus = useAppSelector((state) => state.recipes.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchSavedRecipes());
    }
  }, [recipesStatus, dispatch]);

  const handleRecipeCardClick = (recipeId: string) => {
    navigate(`/recipes/info/${recipeId}`);
  };

  let recipesList;

  if (recipesStatus === "loading") {
    recipesList = <LoadingScreen height="50vh" />;
  } else {
    recipesList = (
      <Box
        mt={4}
        display="flex"
        flexWrap="wrap"
        {...(!smUp && { justifyContent: "space-evenly" })}
      >
        {recipes.map((rec) => (
          <RecipeCard
            recipe={rec}
            handleClick={handleRecipeCardClick}
            key={rec._id}
          />
        ))}
      </Box>
    );
  }

  return (
    <Layout>
      <Fade in={true} timeout={500}>
        <Box>
          <Box display="flex" mt={4} alignItems="center">
            <Typography variant="h4">Saved Recipes</Typography>
            <Box ml="auto" my="auto">
              <StyledButton
                id="add-recipe-button"
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate("/recipes/add")}
              >
                Add
              </StyledButton>
            </Box>
          </Box>
          <Box
            display="flex"
            color="neutral.500"
            justifyContent="space-between"
            mt={4}
            {...(smUp && { width: 400, mx: "auto" })}
          >
            {DishTypes.map((t) => (
              <DishTypeOption
                key={t}
                selected={dishType === t}
                option={t}
                setter={setDishType}
              />
            ))}
          </Box>
          {recipesList}
        </Box>
      </Fade>
    </Layout>
  );
};
