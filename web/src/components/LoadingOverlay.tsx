import { Backdrop, useTheme } from "@mui/material";
import { LoadingScreen } from "./LoadingScreen";

type LoadingOverlayProps = {
  open: boolean;
};

export const LoadingOverlay = ({ open }: LoadingOverlayProps) => {
  const theme = useTheme();
  return (
    <Backdrop open={open} sx={{ zIndex: theme.zIndex.drawer + 10 }}>
      <LoadingScreen />
    </Backdrop>
  );
};
