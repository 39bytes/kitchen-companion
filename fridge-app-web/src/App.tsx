import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Fridge from "./pages/Fridge";
import Main from "./Main";
import AuthProvider from "./AuthProvider";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import RequireAuth from "./components/RequireAuth";
import { CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import GroceryList from "./pages/GroceryList";

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
