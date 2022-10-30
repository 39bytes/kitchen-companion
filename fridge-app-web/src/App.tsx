import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Fridge from "./components/Fridge";
import { IngredientSearch } from "./lib/api";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Fridge />
    </div>
  );
}

export default App;
