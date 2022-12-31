import { Recipe } from "@backend/recipe";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getRecipeById } from "src/lib/api";
import { RootState } from "src/store";

const recipeInfoAdapter = createEntityAdapter<Recipe>({
  selectId: (recipe) => recipe.id,
});

export const fetchRecipeInfo = createAsyncThunk(
  "recipeInfo/fetchRecipeInfo",
  async (recipeId: number) => {
    return await getRecipeById(recipeId);
  }
);

export const recipeInfoSlice = createSlice({
  name: "recipeInfo",
  initialState: recipeInfoAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecipeInfo.fulfilled, recipeInfoAdapter.setOne);
  },
});

export default recipeInfoSlice.reducer;

export const { selectById: selectRecipeInfoById } =
  recipeInfoAdapter.getSelectors<RootState>((state) => state.recipeInfo);
