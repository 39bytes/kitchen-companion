import { configureStore } from "@reduxjs/toolkit";
import FridgeReducer from "./fridge/fridgeSlice";
import RecipesReducer from "./recipes/recipesSlice";
import RecommendationsReducer from "./recommendations/recommendationsSlice";
import RecipeInfoReducer from "./recommendations/recipeInfoSlice";

const store = configureStore({
  reducer: {
    fridge: FridgeReducer,
    recipes: RecipesReducer,
    recommendations: RecommendationsReducer,
    recipeInfo: RecipeInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
