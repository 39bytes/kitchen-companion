import { Menu } from "@mui/icons-material";
import { Box, IconButton, Stack, SvgIcon, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { SIDENAV_WIDTH, TOPNAV_HEIGHT } from "./Layout";

type TopNavProps = {
  onNavOpen: () => void;
};

export const TopNav = ({ onNavOpen }: TopNavProps) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDENAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDENAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.drawer,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOPNAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Menu />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
