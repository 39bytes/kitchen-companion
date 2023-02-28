import { Recipe } from "../../api/types/recipe";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { getRecipeById } from "src/api/api";
import { RootState } from "../store";

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
    const recipes = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/recipes",
      { withCredentials: true }
    );
    return recipes.data as Recipe[];
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/recipeAdded",
  async (recipe: Recipe) => {}
);

export const saveRecipe = createAsyncThunk(
  "recipes/recipeSaved",
  async (recipe: Recipe) => {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/recipes/addRecipe",
      recipe,
      { withCredentials: true }
    );
    return response.data as Recipe;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/recipeDeleted",
  async (recipeId: string) => {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/recipes/deleteRecipe",
      {
        id: recipeId,
      },
      { withCredentials: true }
    );

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
