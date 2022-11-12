import {
  Category,
  Ingredient,
  IngredientSearchResult,
} from "@backend/ingredient";
import { UserFridgeDocument } from "@backend/userfridge";
import { AcUnit, Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IngredientExpiration } from "src/lib/api";
import { testData } from "../../lib/testData";
import CategoryContainer from "../containers/CategoryContainer";
import MainContainer from "../containers/MainContainer";
import FridgeCategory from "./FridgeCategory";
import IngredientQuantityDialog from "./IngredientQuantityDialog";
import { IngredientSearchDialog } from "./IngredientSearchDialog";
import Sidebar from "../Sidebar";

const Fridge = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [quantityOpen, setQuantityOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>({
    id: 0,
    name: "",
    image: "",
    category: "",
    unit: "",
    quantity: 0,
    possibleUnits: [],
    dateAdded: Date.now(),
  });
  const [fridgeItems, setFridgeItems] = useState<Category[]>([]);
  const [userFridge, setUserFridge] = useState<UserFridgeDocument>();
  // Load ingredient data
  // TODO: Replace this with fetching from local storage/a backend
  useEffect(() => {
    setFridgeItems([
      { name: "Staples", items: testData },
      { name: "Proteins", items: testData.slice() },
      { name: "Fruits & Vegetables", items: testData.slice() },
      { name: "Pantry", items: testData.slice() },
      { name: "Freezer", items: testData.slice() },
      { name: "Spices", items: testData.slice() },
    ]);
    axios.get("/fridge", { withCredentials: true }).then((res) => {
      setUserFridge(res.data as UserFridgeDocument);
    });
  }, []);

  const handleQuantityClose = (value: Ingredient | undefined) => {
    if (!value) {
      setQuantityOpen(false);
      return;
    }

    // Add the selected food into the fridge
    // TODO: Autodetermine category
    const newFridge = fridgeItems.slice();

    // If modifying the quantity of an existing ingredient
    // FIXME: This doesn't work properly
    let index = newFridge[0].items.findIndex((i) => i.id === value.id);
    if (index !== -1) {
      // Replace the item
      newFridge[0].items.splice(index, 1, value);
    } else {
      // REWRITE THIS: Does not update immediately
      IngredientExpiration(value.name).then((data) => {
        const newIngredient = { expirationData: data, ...value };
        console.log(newIngredient);
        newFridge[0].items = newFridge[0].items.concat(newIngredient);
      });
    }

    setFridgeItems(newFridge);
    setQuantityOpen(false);
  };

  const handleSearchClose = (value: IngredientSearchResult | undefined) => {
    setSearchOpen(false);

    if (!value) {
      return;
    }

    let ingredientObj: Ingredient = {
      category: value.aisle,
      dateAdded: Date.now(),
      unit: "",
      quantity: 0,
      ...value,
    };

    setSelectedIngredient(ingredientObj);
    setQuantityOpen(true);
  };

  const addButtonClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setQuantityOpen(true);
  };

  return (
    <div>
      <Sidebar />
      <MainContainer>
        <CategoryContainer>
          {fridgeItems.map((c) => (
            <FridgeCategory
              key={c.name}
              name={c.name}
              items={c.items}
              color="#2196f3"
              icon={<AcUnit />}
              onAddButtonClick={addButtonClick}
            />
          ))}
        </CategoryContainer>
        <IngredientSearchDialog open={searchOpen} onClose={handleSearchClose} />
        <IngredientQuantityDialog
          open={quantityOpen}
          ingredient={selectedIngredient}
          handleClose={handleQuantityClose}
        />
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "sticky", bottom: 20, left: 1150 }} // FIXME: The positioning on this button doesn't work properly
          onClick={() => setSearchOpen(true)}
        >
          <Add />
        </Fab>
      </MainContainer>
    </div>
  );
};

export default Fridge;
