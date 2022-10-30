import { Add, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

type AddRemoveButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const AddRemoveButton = ({ onClick }: AddRemoveButtonProps) => {
  return (
    <IconButton
      edge="end"
      aria-label="Add"
      sx={{ p: 0.5, mr: 0.1, borderRadius: 2 }}
      onClick={onClick}
    >
      <Add color="primary" sx={{ mx: 0 }} />
      /
      <Remove color="error" sx={{ mx: 0 }} />
    </IconButton>
  );
};

export default AddRemoveButton;
