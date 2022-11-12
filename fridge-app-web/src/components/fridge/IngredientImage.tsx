import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import { getImageUrl } from "../../utils/getImageUrl";

type ImageProps = {
  imageName: string;
  alt?: string;
};

const IngredientImage = ({
  alt = "Ingredient Thumbnail",
  imageName,
}: ImageProps) => {
  return (
    <Box
      component="img"
      sx={{ maxWidth: 40, maxHeight: 40, mx: "auto" }}
      src={getImageUrl(imageName)}
      alt={alt}
    />
  );
};

export default IngredientImage;
