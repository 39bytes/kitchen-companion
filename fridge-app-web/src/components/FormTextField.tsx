import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export const FormTextField = (props: TextFieldProps) => {
  return (
    <TextField
      variant="standard"
      sx={{ mt: 4 }}
      label={props.label}
      id={props.id}
      {...props}
    />
  );
};
