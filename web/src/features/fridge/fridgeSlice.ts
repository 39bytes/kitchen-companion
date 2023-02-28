import {
  FridgeIngredient,
  FridgeSection,
  Ingredient,
  UserFridgeDocument,
  UpdateIngredientPayload,
} from "../../api/types/userfridge";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const fridgeContentsAdapter = createEntityAdapter<FridgeIngredient>({
  selectId: (ingredient) => ingredient._id.toString(),
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

interface FridgeState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState = fridgeContentsAdapter.getInitialState<FridgeState>({
  status: "idle",
  error: null,
});

export const fetchContents = createAsyncThunk(
  "fridge/fetchContents",
  async () => {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/fridge",
      { withCredentials: true }
    );
    const userFridge = response.data as UserFridgeDocument;
    return userFridge.contents;
  }
);

type NewIngredientPayload = {
  ingredientData: Ingredient;
  quantity: number;
  unit: string;
  section: FridgeSection;
};

export const addNewIngredient = createAsyncThunk(
  "fridge/ingredientAdded",
  async (data: NewIngredientPayload) => {
    const { ingredientData, quantity, unit, section } = data;
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/fridge/addIngredient",
      { ...ingredientData, quantity, unit, section },
      { withCredentials: true }
    );
    return response.data as FridgeIngredient;
  }
);

export const updateIngredient = createAsyncThunk(
  "fridge/ingredientUpdated",
  async (data: UpdateIngredientPayload) => {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/fridge/updateIngredient",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data as UpdateIngredientPayload;
  }
);

export const deleteIngredient = createAsyncThunk(
  "fridge/ingredientDeleted",
  async (ingredientId: string) => {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/fridge/deleteIngredient",
      { id: ingredientId },
      {
        withCredentials: true,
      }
    );
    return response.data as string;
  }
);

export const fridgeSlice = createSlice({
  name: "fridge",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = "success";
        fridgeContentsAdapter.setMany(state, action.payload);
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Failed to fetch fridge contents.";
      })
      .addCase(addNewIngredient.fulfilled, fridgeContentsAdapter.addOne)
      .addCase(updateIngredient.fulfilled, (state, action) => {
        const { ingredientId, quantity, unit, section } = action.payload;
        fridgeContentsAdapter.updateOne(state, {
          id: ingredientId,
          changes: {
            quantity,
            unit,
            section,
          },
        });
      })
      .addCase(deleteIngredient.fulfilled, fridgeContentsAdapter.removeOne);
  },
});

export default fridgeSlice.reducer;

export const {
  selectAll: selectAllFridgeIngredients,
  selectById: selectFridgeIngredientById,
} = fridgeContentsAdapter.getSelectors<RootState>((state) => state.fridge);
