import { configureStore } from "@reduxjs/toolkit";
import FridgeReducer from "./features/fridge/fridgeSlice";
import RecipesReducer from "./features/recipes/recipesSlice";
import RecommendationsReducer from "./features/recommendations/recommendationsSlice";
import RecipeInfoReducer from "./features/recommendations/recipeInfoSlice";

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
