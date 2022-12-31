import { Recipe } from "@backend/recipe";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { getRecipeById } from "src/lib/api";
import { RootState } from "src/store";

const recipesAdapter = createEntityAdapter<Recipe>();

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
    const recipes = await axios.get("/recipes");
    return recipes.data as Recipe[];
  }
);

export const saveRecipe = createAsyncThunk(
  "recipes/recipeSaved",
  async (recipe: Recipe) => {
    const response = await axios.post("/recipes/addRecipe", recipe);
    return response.data as Recipe;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/recipeDeleted",
  async (recipeId: string) => {
    const response = await axios.post("/recipes/deleteRecipe", {
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
        state.error = "Failed to fetch fridge contents.";
      })
      .addCase(saveRecipe.fulfilled, recipesAdapter.addOne)
      .addCase(deleteRecipe.fulfilled, recipesAdapter.removeOne);
  },
});

export default recipesSlice.reducer;

export const { selectAll: selectAllRecipes, selectById: selectRecipeById } =
  recipesAdapter.getSelectors<RootState>((state) => state.recipes);
