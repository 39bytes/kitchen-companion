import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import ScrollToTop from "./components/ScrollToTop";
import { Login } from "./features/auth/Login";
import { Register } from "./features/auth/Register";
import Fridge from "./features/fridge/Fridge";
import { AddRecipe } from "./features/recipes/AddRecipe";
import { EditRecipe } from "./features/recipes/EditRecipe";
import { Recipes } from "./features/recipes/Recipes";
import { ViewRecipe } from "./features/recipes/ViewRecipe";
import RecipeRecommendations from "./features/recommendations/RecipeRecommendations";
import { ViewRecommendation } from "./features/recommendations/ViewRecommendation";
import { LandingPage } from "./LandingPage";

function App() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="fridge"
              element={
                <RequireAuth redirectTo="/login">
                  <Fridge />
                </RequireAuth>
              }
            />
            <Route path="recipes">
              <Route
                index
                element={
                  <RequireAuth redirectTo="/login">
                    <Recipes />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:recipeId"
                element={
                  <RequireAuth redirectTo="/login">
                    <EditRecipe />
                  </RequireAuth>
                }
              />
              <Route
                path="info/:recipeId"
                element={
                  <RequireAuth redirectTo="/login">
                    <ViewRecipe />
                  </RequireAuth>
                }
              />
              <Route
                path="add"
                element={
                  <RequireAuth redirectTo="/login">
                    <AddRecipe />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="recommendations">
              <Route
                index
                element={
                  <RequireAuth redirectTo="/login">
                    <RecipeRecommendations />
                  </RequireAuth>
                }
              />
              <Route
                path="info/:recipeId"
                element={
                  <RequireAuth redirectTo="/login">
                    <ViewRecommendation />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
