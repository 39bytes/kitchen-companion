import { Ingredient, IngredientSearchResult } from "@backend/ingredient";
import { FridgeContents, UserFridgeDocument } from "@backend/userfridge";
import { AcUnit, Add, Kitchen } from "@mui/icons-material";
import { Alert, Box, Fab, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getIngredientExpiration } from "src/lib/api";
import CategoryContainer from "../containers/CategoryContainer";
import MainContainer from "../containers/MainContainer";
import Sidebar from "../Sidebar";
import FridgeCategory from "./FridgeCategory";
import { IngredientQuantityDialog } from "./IngredientQuantityDialog";
import { IngredientSearchDialog } from "./IngredientSearchDialog";

const Fridge = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [quantityOpen, setQuantityOpen] = useState(false);
  const [addingNew, setAddingNew] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();
  const [fridgeContents, setFridgeContents] = useState<FridgeContents>();
  const [error, setError] = useState("");

  // Load ingredient data
  useEffect(() => {
    axios.get("/fridge", { withCredentials: true }).then((res) => {
      const userFridge = res.data as UserFridgeDocument;
      const contents = new Map(
        Object.entries(userFridge.contents)
      ) as FridgeContents;
      setFridgeContents(contents);
    });
  }, []);

  if (!fridgeContents) {
    return <div>Loading...</div>;
  }

  const handleQuantityClose = async (
    ingredient: Ingredient,
    addingNew: boolean
  ) => {
    if (!fridgeContents) {
      setQuantityOpen(false);
      return;
    }

    // Make a copy of the old contents
    const newFridgeContents = new Map(
      JSON.parse(JSON.stringify(Array.from(fridgeContents)))
    ) as typeof fridgeContents;

    // User added new ingredient
    if (addingNew) {
      // User cancelled adding a new ingredient
      if (ingredient.quantity === 0) {
        setQuantityOpen(false);
        return;
      }

      // User added new ingredient
      const data = await getIngredientExpiration(ingredient.name);
      const newIngredient = { ...ingredient, expirationData: data };

      // Adds the element to the category
      // Creates the category if it doesn't already exist
      const categoryContents = newFridgeContents.get(ingredient.category) ?? [];
      newFridgeContents.set(
        ingredient.category,
        categoryContents.concat(newIngredient)
      );
    }
    // User editing an existing ingredient
    else {
      // User set quantity to 0 when editing an ingredient quantity
      if (ingredient.quantity === 0) {
        const newCategoryContents = newFridgeContents // Remove that ingredient
          .get(ingredient.category)!
          .filter(
            (item) =>
              !(
                item.id === ingredient.id &&
                item.dateAdded === ingredient.dateAdded
              )
          );
        if (newCategoryContents.length > 0) {
          newFridgeContents.set(ingredient.category, newCategoryContents);
        } else {
          newFridgeContents.delete(ingredient.category);
        }
      } else {
        const index = fridgeContents.get(ingredient.category)!.findIndex(
          (item) =>
            item.id === ingredient.id && item.dateAdded === ingredient.dateAdded //and i.section === value.section
        );
        const newCategoryContents = newFridgeContents
          .get(ingredient.category)!
          .slice();
        newCategoryContents[index] = ingredient;
        newFridgeContents.set(ingredient.category, newCategoryContents);
      }
    }

    const res = await axios.post(
      "/fridge",
      Object.fromEntries(newFridgeContents),
      { withCredentials: true }
    );
    if (res.data.error) {
      setError("An error occured when adding the ingredient.");
    } else {
      setFridgeContents(newFridgeContents);
      console.log(fridgeContents);
    }
    setQuantityOpen(false);
  };

  const handleSearchClose = (result: IngredientSearchResult | undefined) => {
    setSearchOpen(false);
    if (!result) {
      return;
    }

    let ingredientObj: Ingredient = {
      category: result.aisle,
      dateAdded: Date.now(),
      unit: "",
      quantity: 0,
      section: "pantry",
      ...result,
    };

    setAddingNew(true);
    setSelectedIngredient(ingredientObj);
    setQuantityOpen(true);
  };

  const addButtonClick = (ingredient: Ingredient) => {
    setAddingNew(false);
    setSelectedIngredient(ingredient);
    setQuantityOpen(true);
  };

  return (
    <Box overflow="visible">
      <Sidebar />
      <MainContainer>
        <CategoryContainer>
          {Array.from(fridgeContents, ([category, contents]) => (
            <FridgeCategory
              key={category}
              name={category}
              items={contents}
              color="#2196f3"
              icon={<AcUnit />}
              onAddButtonClick={addButtonClick}
            />
          ))}
        </CategoryContainer>
        <IngredientSearchDialog open={searchOpen} onClose={handleSearchClose} />
        {selectedIngredient ? (
          <IngredientQuantityDialog
            open={quantityOpen}
            addingNew={addingNew}
            ingredient={selectedIngredient}
            handleClose={handleQuantityClose}
          />
        ) : (
          <></>
        )}

        {error && (
          <Alert variant="filled" severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}
      </MainContainer>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          left: "auto",
          top: "auto",
        }} // FIXME: The positioning on this button doesn't work properly
        onClick={() => setSearchOpen(true)}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default Fridge;
