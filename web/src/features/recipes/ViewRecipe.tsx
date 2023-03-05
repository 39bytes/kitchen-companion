import { Box, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowLeft, Edit, ExternalLink, Trash2 } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "src/components/layouts/layout/Layout";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { DeleteDialog } from "./DeleteDialog";
import { RecipeInfo } from "./RecipeInfo";
import { deleteRecipe, selectRecipeById } from "./recipesSlice";

export const ViewRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleDeleteButtonClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    setDeleteDialogOpen(false);
    await dispatch(deleteRecipe(recipe._id.toString()));
    navigate("/recipes");
  };

  const iconsMenu = (
    <Box position="relative" right={16} my={1}>
      <Box display="flex" justifyContent="space-between">
        <Tooltip title="Back">
          <IconButton onClick={() => navigate("/recipes")}>
            <ArrowLeft />
          </IconButton>
        </Tooltip>
        <Box
          display="flex"
          justifyContent="center"
          position="relative"
          left={32}
        >
          <Tooltip title="View Source">
            <IconButton href={recipe.sourceUrl} target="_blank">
              <ExternalLink />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => navigate(`/recipes/edit/${recipe._id}`)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteButtonClick}>
              <Trash2 />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Layout>
      <Box sx={{ p: { xl: 2 } }}>
        {iconsMenu}
        <RecipeInfo recipe={recipe} />
        <DeleteDialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          onDelete={handleDelete}
        />
      </Box>
    </Layout>
  );
};
