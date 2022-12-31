import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./AuthProvider";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./features/auth/Login";
import RegisterPage from "./features/auth/Register";
import Fridge from "./features/fridge/Fridge";
import GroceryList from "./features/grocery-list/GroceryList";
import { Recipes } from "./features/recipes/Recipes";
import RecipeRecommendations from "./features/recommendations/RecipeRecommendations";

function App() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <RequireAuth redirectTo="/login">
                  <Fridge />
                </RequireAuth>
              }
            />
            <Route
              path="/recipes"
              element={
                <RequireAuth redirectTo="/login">
                  <Recipes />
                </RequireAuth>
              }
            />
            <Route
              path="/recommendations"
              element={
                <RequireAuth redirectTo="/login">
                  <RecipeRecommendations />
                </RequireAuth>
              }
            />
            <Route
              path="/grocery"
              element={
                <RequireAuth redirectTo="/login">
                  <GroceryList />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
