import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import logoImg from "./icon.png";

const StyledImage = styled("img")`
  width: 32px;
  height: 32px;
  margin: auto;
`;

export const Logo = () => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "inline-flex",
        height: 32,
        width: 32,
      }}
      position="relative"
      right={8}
      bottom={4}
    >
      <Box
        sx={{
          ":hover": {
            backgroundColor: "neutral.700",
            transitionDuration: "0.2s",
          },
          transitionDuration: "0.2s",
          width: "48px",
          height: "48px",
        }}
        p={1}
        boxSizing="border-box"
        borderRadius="50%"
      >
        <StyledImage src={logoImg} />
      </Box>
    </Box>
  );
};
