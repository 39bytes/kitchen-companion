import { configureStore } from "@reduxjs/toolkit";
import FridgeReducer from "./features/fridge/fridgeSlice";

const store = configureStore({
  reducer: {
    fridge: FridgeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
