import { Box, LinearProgress, styled } from "@mui/material";
import logoImg from "../assets/icon.png";

const StyledImage = styled("img")`
  width: 32px;
  height: 32px;
  display: block;
  margin: auto;
`;

type LoadingScreenProps = {
  height?: string | number;
};

export const LoadingScreen = ({ height }: LoadingScreenProps) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height={height ? height : "100vh"}
    width="100%"
  >
    <Box display="flex" flexDirection="column" justifyContent="center">
      <StyledImage src={logoImg} alt="logo" />
      <LinearProgress sx={{ width: 40, mt: 1.25 }} />
    </Box>
  </Box>
);
