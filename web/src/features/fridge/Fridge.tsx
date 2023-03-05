import { Add } from "@mui/icons-material";
import MuiMasonry from "@mui/lab/Masonry";
import { Box, Fab, Paper, styled, useTheme } from "@mui/material";
import Fade from "@mui/material/Fade";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { CenteredSpinner } from "src/components/CenteredSpinner";
import Layout from "src/components/layouts/layout/Layout";
import { LoadingScreen } from "src/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { groupIngredientsByAisle } from "src/utils/groupIngredientsBy";
import { Ingredient } from "../../api/types/userfridge";
import FridgeCategory from "./FridgeCategory";
import { fetchContents, selectAllFridgeIngredients } from "./fridgeSlice";
import { IngredientAddDialog } from "./IngredientAddDialog";
import { IngredientEditDialog } from "./IngredientEditDialog";
import { IngredientSearchDialog } from "./IngredientSearchDialog";

const Masonry = styled(MuiMasonry)(({ theme }) => ({}));

const Fridge = () => {
  const theme = useTheme();
  const snackbar = useSnackbar();

  const [searchOpen, setSearchOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();
  const [ingredientToEdit, setIngredientToEdit] = useState<string>();

  const fridgeContents = useAppSelector(selectAllFridgeIngredients);
  const fridgeStatus = useAppSelector((state) => state.fridge.status);
  const error = useAppSelector((state) => state.fridge.error);
  const dispatch = useAppDispatch();

  const groupedFridgeContents = useMemo(
    () => groupIngredientsByAisle(fridgeContents),
    [fridgeContents]
  );

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
    content = <LoadingScreen height="80vh" />;
  } else if (fridgeStatus === "failed") {
    content = <div>{error}</div>;
  } else if (fridgeStatus === "success") {
    content = (
      <Masonry columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} spacing={2}>
        {Array.from(groupedFridgeContents, ([key, contents]) => (
          <Paper key={key} elevation={0} sx={{ borderRadius: 3 }}>
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
    <Layout>
      <Fade in={true} timeout={500}>
        <Box mt={4}>
          <IngredientSearchDialog
            open={searchOpen}
            onClose={handleSearchClose}
          />
          {selectedIngredient && (
            <IngredientAddDialog
              open={addOpen}
              handleClose={handleAddClose}
              ingredient={selectedIngredient}
            />
          )}
          {ingredientToEdit && (
            <IngredientEditDialog
              open={editOpen}
              handleClose={handleEditClose}
              ingredientId={ingredientToEdit}
            />
          )}
          {content}
          <AddIngredientButton />
        </Box>
      </Fade>
    </Layout>
  );
};

export default Fridge;
