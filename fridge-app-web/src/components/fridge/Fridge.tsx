import { Ingredient, IngredientSearchResult } from "@backend/ingredient";
import { UserFridgeDocument } from "@backend/userfridge";
import { Add, Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Collapse,
  Fab,
  FormControl,
  Grid,
  Grow,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
  useTheme,
} from "@mui/material";
import MuiMasonry from "@mui/lab/Masonry";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { getIngredientExpiration } from "src/lib/api";
import { groupIngredientsBy } from "src/utils/groupIngredientsBy";

import Layout from "../containers/Layout";
import FridgeCategory from "./FridgeCategory";
import { IngredientQuantityDialog } from "./IngredientQuantityDialog";
import { IngredientSearchDialog } from "./IngredientSearchDialog";

type GroupKey = "section" | "category";
type SortKey = "name" | "expiration";

const Masonry = styled(MuiMasonry)(({ theme }) => ({}));

const Fridge = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [quantityOpen, setQuantityOpen] = useState(false);

  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();
  const [fridgeContents, setFridgeContents] = useState<Ingredient[]>();
  const [sortedFridgeContents, setSortedFridgeContents] =
    useState<Map<string, Ingredient[]>>();
  const [groupKey, setGroupKey] = useState<GroupKey>("section");
  const [sortKey, setSortKey] = useState<SortKey>("name");

  const [contentsChanged, setContentsChanged] = useState(false);

  const snackbar = useSnackbar();
  const theme = useTheme();

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
    setSortedFridgeContents(
      groupIngredientsBy(fridgeContents, groupKey, sortKey)
    );
    setContentsChanged(true);
  }, [fridgeContents, groupKey, sortKey]);

  // if (!fridgeContents || !sortedFridgeContents) {
  //   return <div>Loading...</div>;
  // }

  const handleSortButtonClick = () => {
    if (groupKey === "category") {
      setGroupKey("section");
    } else {
      setGroupKey("category");
    }
  };

  const updateFridgeContents = async (newFridgeContents: Ingredient[]) => {
    const res = await axios.post("/fridge", newFridgeContents, {
      withCredentials: true,
    });
    if (res.data.error) {
      snackbar.enqueueSnackbar(
        "An error occured when updating fridge contents.",
        { variant: "error" }
      );
    } else {
      setFridgeContents(newFridgeContents);
      snackbar.enqueueSnackbar("Updated fridge contents successfully.", {
        variant: "success",
      });
    }
  };

  const handleQuantityClose = async (ingredient: Ingredient | undefined) => {
    if (!fridgeContents || !ingredient) {
      setQuantityOpen(false);
      return;
    }

    // Make a copy of the old contents
    let newFridgeContents = fridgeContents.slice();

    // User cancelled adding a new ingredient
    if (ingredient.quantity === 0) {
      setQuantityOpen(false);
      return;
    }

    // User added new ingredient
    const data = await getIngredientExpiration(ingredient.name);
    const newIngredient = { ...ingredient, expirationData: data };

    newFridgeContents.push(newIngredient);

    await updateFridgeContents(newFridgeContents);
    setQuantityOpen(false);
  };

  // User editing an existing ingredient
  const handleEditClose = async (ingredient: Ingredient | undefined) => {
    if (!fridgeContents || !ingredient) {
      setEditOpen(false);
      return;
    }

    let newFridgeContents = fridgeContents.slice();

    // User set quantity to 0 when editing an ingredient quantity
    if (ingredient.quantity === 0) {
      newFridgeContents = newFridgeContents.filter(
        // Remove that ingredient
        (item) =>
          !(
            item.id === ingredient.id && item.dateAdded === ingredient.dateAdded
          )
      );
    } else {
      // Immutably update the ingredient
      const index = fridgeContents.findIndex(
        (item) =>
          item.id === ingredient.id && item.dateAdded === ingredient.dateAdded
      );
      newFridgeContents[index] = ingredient;
    }

    await updateFridgeContents(newFridgeContents);
    setEditOpen(false);
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
      quantity: 1,
      section: "pantry",
      ...result,
    };

    setSelectedIngredient(ingredientObj);
    setQuantityOpen(true);
  };

  const editButtonClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setEditOpen(true);
  };

  const handleGroupByChange = (event: SelectChangeEvent) => {
    setGroupKey(event.target.value as GroupKey);
  };

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortKey(event.target.value as SortKey);
  };

  return (
    <Layout>
      <Box display="flex" justifyContent="end">
        <FormControl variant="standard" sx={{ mr: 2 }}>
          <InputLabel id="group-by-label">Group by</InputLabel>
          <Select
            labelId="group-by-label"
            value={groupKey}
            label="Group by"
            onChange={handleGroupByChange}
            color="primary"
          >
            <MenuItem value="section">Section</MenuItem>
            <MenuItem value="category">Category</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortKey}
            label="Sort by"
            onChange={handleSortByChange}
            color="primary"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="expiration">Expiration</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* <Grid container spacing={2} alignItems="start">
        {Array.from(sortedFridgeContents, ([key, contents]) => (
          <Grid item lg={4} md={6} sm={12}>
            <FridgeCategory
              key={key}
              name={key}
              items={contents}
              onAddButtonClick={editButtonClick}
            />
          </Grid>
        ))}
      </Grid> */}
      {sortedFridgeContents ? (
        <Masonry columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
          {Array.from(sortedFridgeContents, ([key, contents]) => (
            <Grow
              in={contentsChanged}
              {...(contentsChanged ? { timeout: 500 } : {})}
            >
              <Paper elevation={1} sx={{ minWidth: 150 }}>
                <FridgeCategory
                  key={key}
                  name={key}
                  items={contents}
                  onAddButtonClick={editButtonClick}
                />
              </Paper>
            </Grow>
          ))}
        </Masonry>
      ) : (
        <div>Loading...</div>
      )}

      <IngredientSearchDialog open={searchOpen} onClose={handleSearchClose} />
      {selectedIngredient ? (
        <>
          <IngredientQuantityDialog
            open={quantityOpen}
            ingredient={selectedIngredient}
            handleClose={handleQuantityClose}
            variant="create"
          />
          <IngredientQuantityDialog
            open={editOpen}
            ingredient={selectedIngredient}
            handleClose={handleEditClose}
            variant="edit"
          />
        </>
      ) : (
        <></>
      )}

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          left: "auto",
          top: "auto",
        }}
        onClick={() => setSearchOpen(true)}
      >
        <Add />
      </Fab>
    </Layout>
  );
};

export default Fridge;
