export {};
// import { RecipeByIngredientResult } from "../../api/types/recipe";
// import {
//   createAsyncThunk,
//   createEntityAdapter,
//   createSlice,
// } from "@reduxjs/toolkit";
// import axios from "axios";
// import { RootState } from "../store";

// const recommendationsAdapter = createEntityAdapter<RecipeByIngredientResult>();

// interface RecommendationsState {
//   status: "idle" | "loading" | "success" | "failed";
//   error: string | null;
// }

// const initialState =
//   recommendationsAdapter.getInitialState<RecommendationsState>({
//     status: "idle",
//     error: null,
//   });

// export const fetchRecommendations = createAsyncThunk(
//   "recipes/fetchRecommendations",
//   async () => {
//     const response = await axios.get(
//       process.env.REACT_APP_BACKEND_URL + "/recipes/recommendations",
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data as RecipeByIngredientResult[];
//   }
// );

// export const recommendationsSlice = createSlice({
//   name: "recommendations",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRecommendations.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(fetchRecommendations.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = "Failed to fetch recipe recommendations.";
//       })
//       .addCase(fetchRecommendations.fulfilled, (state, action) => {
//         state.status = "success";
//         recommendationsAdapter.setAll(state, action.payload);
//       });
//   },
// });

// export default recommendationsSlice.reducer;

// export const { selectAll: selectAllRecipeRecommendations } =
//   recommendationsAdapter.getSelectors<RootState>(
//     (state) => state.recommendations
//   );
