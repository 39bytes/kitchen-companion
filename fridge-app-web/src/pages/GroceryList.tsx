import { Kitchen } from "@mui/icons-material";
import { GroceryItemDocument, GroceryListDocument } from "@backend/grocerylist";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "src/components/containers/Layout";
import axios from "axios";

type GroceryListItemProps = {
  item?: GroceryItemDocument;
};

const GroceryListItem = ({ item }: GroceryListItemProps) => {
  const theme = useTheme();

  return (
    <FormControlLabel
      control={<Checkbox checked={item?.purchased} />}
      label={
        <>
          Filler
          <Typography variant="caption" component="span" sx={{ ml: 0.5 }}>
            6g
          </Typography>
        </>
      }
      sx={{
        "&:hover": {
          bgcolor: theme.palette.grey[200],
        },
        width: 200,
        height: 50,
        borderRadius: 1,
        transition: "background-color 150ms linear",
      }}
    ></FormControlLabel>
  );
};

// Much of the code is similar to the Fridge page code (fetching data, grouping items, etc.)
// How can I refactor it to reduce repetition?
const GroceryList = () => {
  const [groceryListItems, setGroceryListItems] =
    useState<GroceryItemDocument[]>();
  const [groupedGroceryList, setGroupedGroceryList] =
    useState<Map<string, GroceryItemDocument[]>>();

  useEffect(() => {
    axios.get("/fridge", { withCredentials: true }).then((res) => {
      const groceryList = res.data as GroceryListDocument;
      const items = groceryList.items;
      setGroceryListItems(items);
    });
  });

  const handleImportButtonClick = () => {};

  return (
    <Layout title="Grocery List">
      <Paper sx={{ px: 3, py: 2 }}>
        <FormControl>
          <FormGroup>
            <Typography variant="h6" color="primary">
              Produce
            </Typography>
            <GroceryListItem />
            <GroceryListItem />
            <GroceryListItem />
            <GroceryListItem />
            <GroceryListItem />
          </FormGroup>
        </FormControl>
      </Paper>
      <Button variant="outlined" onClick={handleImportButtonClick}>
        Add Purchased to Fridge
      </Button>
    </Layout>
  );
};

export default GroceryList;
