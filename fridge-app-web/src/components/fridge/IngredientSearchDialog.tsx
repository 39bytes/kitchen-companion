import { Search } from "@mui/icons-material";
import { Box, Dialog, List, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { IngredientSearchResult } from "@backend/ingredient";
import { getIngredientSearch } from "../../lib/api";
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
    setSearchQuery("");
    onClose(undefined);
  };

  const handleListItemClick = (value: IngredientSearchResult) => {
    setSearchResults([]);
    setSearchQuery("");
    onClose(value);
  };

  // For querying the Spoonacular API to get ingredients
  const getIngredients = (value: string | null) => {
    if (!value) {
      return;
    }

    // Return 10 results
    getIngredientSearch(value, 10).then((data) => {
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
          {searchResults.length > 0 ? (
            <List>
              {searchResults.map((result) => {
                return (
                  <IngredientSearchResultCard
                    key={result.id}
                    ingredient={result}
                    handleClick={handleListItemClick}
                  />
                );
              })}
            </List>
          ) : (
            <>
              {searchQuery !== "" ? (
                <Box key="no-results" textAlign="center">
                  <Typography>No results found :(</Typography>
                </Box>
              ) : (
                <></>
              )}
            </>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};
