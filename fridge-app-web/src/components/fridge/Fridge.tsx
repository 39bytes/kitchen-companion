import { Ingredient, IngredientSearchResult } from "@backend/ingredient";
import { UserFridgeDocument } from "@backend/userfridge";
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
  const [fridgeContents, setFridgeContents] = useState<Ingredient[]>();
  const [sortedFridgeContents, setSortedFridgeContents] =
    useState<Map<string, Ingredient[]>>();
  const [sortKey, setSortKey] = useState<"section" | "category">("section");
  const [error, setError] = useState("");

  const groupIngredientsBy = (
    key: "section" | "category",
    contents: Ingredient[]
  ) => {
    let sections = new Map<string, Ingredient[]>();

    for (const ingredient of contents) {
      let arr = sections.get(ingredient[key]);
      if (arr) {
        arr.push(ingredient);
      } else {
        sections.set(ingredient[key], [ingredient]);
      }
    }

    return sections;
  };

  // Load ingredient data
  useEffect(() => {
    axios.get("/fridge", { withCredentials: true }).then((res) => {
      const userFridge = res.data as UserFridgeDocument;
      const contents = userFridge.contents;
      setFridgeContents(contents);
    });
  }, []);

  useEffect(() => {
    if (!fridgeContents) return;
    setSortedFridgeContents(groupIngredientsBy(sortKey, fridgeContents));
  }, [fridgeContents, sortKey]);

  if (!fridgeContents || !sortedFridgeContents) {
    return <div>Loading...</div>;
  }

  const handleSortButtonClick = () => {
    if (sortKey === "category") {
      setSortKey("section");
    } else {
      setSortKey("category");
    }
  };

  const handleQuantityClose = async (
    ingredient: Ingredient,
    addingNew: boolean
  ) => {
    if (!fridgeContents) {
      setQuantityOpen(false);
      return;
    }

    // Make a copy of the old contents
    let newFridgeContents = fridgeContents.slice();

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

      newFridgeContents.push(newIngredient);
    }
    // User editing an existing ingredient
    else {
      // User set quantity to 0 when editing an ingredient quantity
      if (ingredient.quantity === 0) {
        newFridgeContents = newFridgeContents.filter(
          (item) =>
            !(
              item.id === ingredient.id &&
              item.dateAdded === ingredient.dateAdded
            )
        );
      } else {
        const index = fridgeContents.findIndex(
          (item) =>
            item.id === ingredient.id && item.dateAdded === ingredient.dateAdded
        );
        newFridgeContents[index] = ingredient;
      }
    }

    const res = await axios.post("/fridge", newFridgeContents, {
      withCredentials: true,
    });
    if (res.data.error) {
      setError("An error occured when adding the ingredient.");
      console.log(res.data.error);
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
          {Array.from(sortedFridgeContents, ([key, contents]) => (
            <FridgeCategory
              key={key}
              name={key}
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
        <IconButton
          aria-label="sort by section"
          onClick={handleSortButtonClick}
        >
          <Kitchen />
        </IconButton>
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
