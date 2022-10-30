import { Box } from "@mui/material";
import React from "react";

type CategoryContainerProps = {
  children: React.ReactNode;
};

const CategoryContainer = ({ children }: CategoryContainerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {children}
    </Box>
  );
};

export default CategoryContainer;
