import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Layout from "src/components/containers/Layout";

const GroceryListItem = () => {
  const theme = useTheme();

  return (
    <FormControlLabel
      control={<Checkbox />}
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

const GroceryList = () => {
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
    </Layout>
  );
};

export default GroceryList;
