import {
  Box,
  Button,
  makeStyles,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ButtonProps } from "@mui/material";
import { styled } from "@mui/system";
import logoImg from "./assets/icon.png";
import { Circles } from "./components/Circles";
import { css, keyframes } from "@emotion/react";

const easeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-50%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const AnimatedContainer = styled("div")({
  animation: `${easeIn} 800ms cubic-bezier(.27,.74,.46,.95) both`,
});

export const LandingPage = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <AnimatedContainer>
        <Circles
          position="relative"
          right={16}
          bottom={144}
          sx={{ transform: "rotate(-45deg)" }}
        />
        <Box
          borderRadius="100%"
          bgcolor="neutral.50"
          width={192}
          height={192}
          mx="auto"
          mb={6}
        >
          <img src={logoImg} width={192} height={192} />
        </Box>
        <Circles
          position="relative"
          right={24}
          bottom={24}
          sx={{ transform: "rotate(-15deg) scaleX(-1)" }}
        />
        <Box width="fit-content">
          <Typography variant="h1" textAlign="center">
            Kitchen Companion
          </Typography>
          <Typography variant="h5" textAlign="center">
            An all in one food and recipe app.
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            sx={{
              px: 4,
              py: 1,
              textTransform: "none",
              borderRadius: "24px",
              fontSize: "1rem",
            }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/register"
            sx={{
              ml: 2,
              px: 4,
              py: 1,
              textTransform: "none",
              borderRadius: "24px",
              fontSize: "1rem",
            }}
          >
            Register
          </Button>
        </Box>
      </AnimatedContainer>
    </Box>
  );
};
