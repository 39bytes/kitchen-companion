import { Search } from "@mui/icons-material";
import {
  Box,
  Dialog,
  List,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Ingredient } from "../../api/types/userfridge";
import { getIngredientSearch } from "../../api/api";
import { IngredientSearchResultCard } from "./IngredientSearchResultCard";
import { SlideTransition } from "src/components/SlideTransition";

type IngredientSearchDialogProps = {
  open: boolean;
  onClose: (value: Ingredient | undefined) => void;
};

export const IngredientSearchDialog = ({
  open,
  onClose,
}: IngredientSearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Ingredient[]>([]);
  const [searching, setSearching] = useState(false);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  // Only update the search results when the user hasn't typed for a bit
  // This prevents unnecessary API call spam
  useEffect(() => {
    setSearchResults([]);
    if (searchQuery === "") {
      return;
    }
    setSearching(true);
    const timeoutId = setTimeout(() => getIngredients(searchQuery), 200);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // For querying the Spoonacular API to get ingredients
  const getIngredients = (value: string | null) => {
    if (!value) {
      return;
    }

    // Return 10 results
    getIngredientSearch(value, 15).then((data) => {
      if (searchQuery === "") {
        return;
      }
      setSearchResults(data);
      setSearching(false);
    });
  };

  // These two are for closing the dialog
  const handleClose = () => {
    setSearchResults([]);
    setSearchQuery("");
    onClose(undefined);
  };

  const handleListItemClick = (value: Ingredient) => {
    setSearchResults([]);
    setSearchQuery("");
    onClose(value);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Box width={smUp ? 400 : 300} height={500}>
          <TextField
            InputProps={{
              startAdornment: <Search color="secondary" sx={{ mr: 1 }} />,
            }}
            variant="standard"
            fullWidth
            sx={{
              p: 3,
            }}
            placeholder="Search for ingredient..."
            onChange={(e) =>
              setSearchQuery((e.target as HTMLInputElement).value)
            }
          />
          <List>
            {searchResults.length > 0
              ? searchResults.map((result) => (
                  <IngredientSearchResultCard
                    key={result.id}
                    ingredient={result}
                    handleClick={handleListItemClick}
                  />
                ))
              : searchQuery !== "" &&
                !searching && (
                  <Box key="no-results" textAlign="center">
                    <Typography>No results found :(</Typography>
                  </Box>
                )}
          </List>
        </Box>
      </Dialog>
    </Box>
  );
};
