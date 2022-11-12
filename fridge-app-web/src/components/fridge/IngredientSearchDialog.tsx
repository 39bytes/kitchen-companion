import { Search } from "@mui/icons-material";
import { Box, Dialog, List } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { IngredientSearchResult } from "@backend/ingredient";
import { IngredientSearch } from "../../lib/api";
import { IngredientSearchResultCard } from "./IngredientSearchResultCard";

type IngredientSearchDialogProps = {
  open: boolean;
  onClose: (value: IngredientSearchResult | undefined) => void;
};

export const IngredientSearchDialog = ({
  open,
  onClose,
}: IngredientSearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IngredientSearchResult[]>(
    []
  );

  // Only update the search results when the user hasn't typed for a bit
  // This prevents unnecessary API call spam
  useEffect(() => {
    const timeoutId = setTimeout(() => getIngredients(searchQuery), 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // These two are for closing the dialog
  const handleClose = () => {
    setSearchResults([]);
    onClose(undefined);
  };

  const handleListItemClick = (value: IngredientSearchResult) => {
    setSearchResults([]);
    onClose(value);
  };

  // For querying the Spoonacular API to get ingredients
  const getIngredients = (value: string | null) => {
    if (!value) {
      return;
    }

    // Return 10 results
    IngredientSearch(value, 10).then((data) => {
      setSearchResults(data);
    });
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <Box width={400} height={500}>
          <TextField
            InputProps={{
              startAdornment: <Search color="secondary" sx={{ mr: 1 }} />,
            }}
            variant="standard"
            sx={{
              width: "85%",
              p: 3,
            }}
            placeholder="Search for ingredient..."
            onChange={(e) =>
              setSearchQuery((e.target as HTMLInputElement).value)
            }
          />
          <List>
            {searchResults.map((result) => {
              return (
                <IngredientSearchResultCard
                  ingredient={result}
                  handleClick={handleListItemClick}
                />
              );
            })}
          </List>
        </Box>
      </Dialog>
    </Box>
  );
};
