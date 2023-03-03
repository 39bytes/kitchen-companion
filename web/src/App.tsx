import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import { Login } from "./features/auth/Login";
import { Register } from "./features/auth/Register";
import Fridge from "./features/fridge/Fridge";
import GroceryList from "./features/grocery-list/GroceryList";
import { EditRecipe } from "./features/recipes/EditRecipe";
import { Recipes } from "./features/recipes/Recipes";
import { ViewRecipe } from "./features/recipes/ViewRecipe";
import RecipeRecommendations from "./features/recommendations/RecipeRecommendations";

function App() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              index
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
            </Route>
            {/* <Route
              path="recipes"
              element={
                <RequireAuth redirectTo="/login">
                  <Recipes />
                </RequireAuth>
              }
            />
            <Route
              path="recipes/edit/:recipeId"
              element={
                <RequireAuth redirectTo="login">
                  <EditRecipe />
                </RequireAuth>
              }
            /> */}

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
