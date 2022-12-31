import { Box, CircularProgress } from "@mui/material";

export const CenteredSpinner = () => (
  <Box display="flex" justifyContent="center">
    <CircularProgress color="primary" />
  </Box>
);
