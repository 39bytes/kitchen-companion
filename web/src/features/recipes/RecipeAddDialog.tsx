import { Dialog, FormControl } from "@mui/material";
import { useState } from "react";

type RecipeAddDialogProps = {
  open: boolean;
};

export const RecipeAddDialog = ({ open }: RecipeAddDialogProps) => {
  return (
    <Dialog open={open}>
      <FormControl></FormControl>
    </Dialog>
  );
};
