import { DishType, Recipe } from "../../api/types/recipe";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { client, getRecipeById } from "src/api/api";
import { RootState } from "../store";

const recipesAdapter = createEntityAdapter<Recipe>({
  selectId: (recipe) => recipe._id.toString(),
});

interface RecipesState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState = recipesAdapter.getInitialState<RecipesState>({
  status: "idle",
  error: null,
});

export const fetchSavedRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const res = await client.get("/recipes");
    return res.data as Recipe[];
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/recipeSaved",
  async (recipe: Partial<Recipe>) => {
    const res = await client.post("/recipes/addRecipe", recipe);
    return res.data as Recipe;
  }
);

export const updateRecipe = createAsyncThunk(
  "recipes/recipeUpdated",
  async (recipe: Partial<Recipe>) => {
    const res = await client.post("/recipes/updateRecipe", recipe);
    return res.data as Recipe;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/recipeDeleted",
  async (recipeId: string) => {
    const response = await client.post("/recipes/deleteRecipe", {
      id: recipeId,
    });

    // The response is just the id of the deleted recipe
    return response.data as string;
  }
);

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedRecipes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSavedRecipes.fulfilled, (state, action) => {
        state.status = "success";
        recipesAdapter.setMany(state, action.payload);
      })
      .addCase(fetchSavedRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Failed to fetch recipes.";
      })
      .addCase(addRecipe.fulfilled, recipesAdapter.addOne)
      .addCase(updateRecipe.fulfilled, recipesAdapter.setOne)
      .addCase(deleteRecipe.fulfilled, recipesAdapter.removeOne);
  },
});

export default recipesSlice.reducer;

export const { selectAll: selectAllRecipes, selectById: selectRecipeById } =
  recipesAdapter.getSelectors<RootState>((state) => state.recipes);

export const selectRecipeBySpoonacularId = createSelector(
  [selectAllRecipes, (_: RootState, id: number) => id],
  (recipes, id) => recipes.find((recipe) => recipe.id === id)
);

export const selectRecipeByDishType = createSelector(
  [selectAllRecipes, (_: RootState, dishType: DishType) => dishType],
  (recipes, dishType) =>
    recipes.filter((recipe) => recipe.dishType === dishType)
);
