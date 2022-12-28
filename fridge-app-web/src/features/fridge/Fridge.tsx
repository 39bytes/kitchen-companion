import { FridgeIngredient, Ingredient } from "@backend/userfridge";
import MuiMasonry from "@mui/lab/Masonry";
import {
  Box,
  CircularProgress,
  Fab,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "src/components/containers/Layout";
import { useAppDispatch, useAppSelector } from "src/hooks";
import {
  groupIngredientsByAisle,
  groupIngredientsBySection,
} from "src/utils/groupIngredientsBy";
import FridgeCategory from "./FridgeCategory";
import { fetchContents, selectAllFridgeIngredients } from "./fridgeSlice";
import { Add } from "@mui/icons-material";
import { IngredientSearchDialog } from "./IngredientSearchDialog";
import { IngredientAddDialog } from "./IngredientAddDialog";
import { IngredientEditDialog } from "./IngredientEditDialog";
import { useSnackbar } from "notistack";
import Fade from "@mui/material/Fade";

const Masonry = styled(MuiMasonry)(({ theme }) => ({}));
type GroupKey = "section" | "category";

const Fridge = () => {
  const theme = useTheme();
  const snackbar = useSnackbar();

  const [searchOpen, setSearchOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();
  const [ingredientToEdit, setIngredientToEdit] = useState<string>();
  const [groupKey, setGroupKey] = useState<GroupKey>("section");

  const fridgeContents = useAppSelector(selectAllFridgeIngredients);
  const fridgeStatus = useAppSelector((state) => state.fridge.status);
  const error = useAppSelector((state) => state.fridge.error);
  const dispatch = useAppDispatch();

  let groupedFridgeContents;
  if (groupKey === "section") {
    groupedFridgeContents = groupIngredientsBySection(fridgeContents);
  } else {
    groupedFridgeContents = groupIngredientsByAisle(fridgeContents);
  }

  // Load fridge contents
  useEffect(() => {
    if (fridgeStatus === "idle") {
      dispatch(fetchContents());
    }
  }, [fridgeStatus, dispatch]);

  const handleEditButtonClick = (ingredientId: string) => {
    setIngredientToEdit(ingredientId);
    setEditOpen(true);
  };

  const handleSearchClose = (ingredient: Ingredient | undefined) => {
    setSearchOpen(false);
    if (!ingredient) {
      return;
    }
    setSelectedIngredient(ingredient);
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleEditClose = () => {
    setIngredientToEdit("");
    setEditOpen(false);
  };

  const handleGroupByChange = (event: SelectChangeEvent) => {
    setGroupKey(event.target.value as GroupKey);
  };

  const GroupBySelect = () => (
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
  );

  const AddIngredientButton = () => (
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
  );

  let content;

  if (fridgeStatus === "loading") {
    content = (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" />
      </Box>
    );
  } else if (fridgeStatus === "failed") {
    content = <div>{error}</div>;
  } else if (fridgeStatus === "success") {
    content = (
      <Masonry columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        {Array.from(groupedFridgeContents, ([key, contents]) => (
          <Paper key={key} elevation={1} sx={{ minWidth: 150 }}>
            <FridgeCategory
              name={key}
              items={contents}
              onAddButtonClick={handleEditButtonClick}
            />
          </Paper>
        ))}
      </Masonry>
    );
  }

  return (
    <Layout title="My Fridge">
      <Fade in={true} timeout={500}>
        <Box>
          <IngredientSearchDialog
            open={searchOpen}
            onClose={handleSearchClose}
          />
          {selectedIngredient ? (
            <IngredientAddDialog
              open={addOpen}
              handleClose={handleAddClose}
              ingredient={selectedIngredient}
            />
          ) : (
            <></>
          )}
          {ingredientToEdit ? (
            <IngredientEditDialog
              open={editOpen}
              handleClose={handleEditClose}
              ingredientId={ingredientToEdit}
            />
          ) : (
            <></>
          )}
          <Box display="flex" justifyContent="end">
            <GroupBySelect />
          </Box>
          {content}
          <AddIngredientButton />
        </Box>
      </Fade>
    </Layout>
  );
};

export default Fridge;
