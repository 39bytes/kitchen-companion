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
      <Link to="/">
        <StyledImage src={logoImg} />
      </Link>
    </Box>
  );
};
