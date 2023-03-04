import { AccessTime, ArrowBack, Launch, Restaurant } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "src/components/layouts/layout/Layout";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { deleteRecipe, selectRecipeById } from "./recipesSlice";
import { ExternalLink, Edit, Trash2, ArrowLeft } from "react-feather";

type SubInfoProps = BoxProps & {
  icon: React.ReactNode;
  text: string;
};

const SubInfo = ({ icon, text, ...props }: SubInfoProps) => (
  <Box display="flex" alignItems="center" mt={1} color="neutral.500" {...props}>
    {icon}
    <Typography sx={{ ml: 0.5 }} variant="subtitle2">
      {text}
    </Typography>
  </Box>
);

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
};
const DeleteDialog = ({ open, onClose, onDelete }: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete recipe?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
      <Box>
        {iconsMenu}
        <Box>
          <Typography variant="h5" textAlign="center">
            {recipe.title}
          </Typography>
          <Box display="flex" justifyContent="center" mb={2}>
            <SubInfo
              icon={<AccessTime sx={{ fontSize: "14px" }} />}
              text={`${recipe.readyInMinutes} min`}
            />
            <SubInfo
              icon={<Restaurant sx={{ fontSize: "14px" }} />}
              text={`${recipe.servings} servings`}
              ml={2}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Image
              height={300}
              width={300}
              src={recipe.image}
              duration={200}
              style={{
                borderRadius: 16,
              }}
            />
          </Box>
        </Box>
        <Typography variant="h6" mt={2}>
          Ingredients
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2.5 }}>
          {recipe.ingredientsList.map((ingredient, index) => (
            <ListItem
              sx={{ display: "list-item", px: 0, py: 0.25 }}
              key={`ingredient${index}`}
            >
              {ingredient}
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Instructions</Typography>
        {recipe.instructionsList ? (
          <ol style={{ paddingLeft: "22px" }}>
            {recipe.instructionsList.map((instruction, index) => (
              <li style={{ marginTop: "6px" }} key={`instruction${index}`}>
                {instruction}
              </li>
            ))}
          </ol>
        ) : (
          <Typography fontStyle="italic">
            Instructions unavailable for this recipe, view source page for
            instructions.
          </Typography>
        )}
        <DeleteDialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          onDelete={handleDelete}
        />
      </Box>
    </Layout>
  );
};
