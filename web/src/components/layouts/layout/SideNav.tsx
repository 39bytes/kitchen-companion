import { Logout } from "@mui/icons-material";
import { Box, Divider, Drawer, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useLocation } from "react-router-dom";
import { client } from "../../../api/api";
import { Logo } from "./Logo";
import navData from "./navData";
import { SideNavItem } from "./SideNavItem";

type SideNavProps = {
  open: boolean;
  onClose: () => void;
};

export const SideNav = ({ open, onClose }: SideNavProps) => {
  const theme = useTheme();
  const location = useLocation();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const logout = async () => {
    await client.post("/auth/logout");
    window.location.href = "/";
  };

  const content = (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Logo />
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {navData.map((item) => {
              const active = item.path === location.pathname;

              return (
                <li key={item.title}>
                  <SideNavItem
                    active={active}
                    icon={item.icon}
                    path={item.path}
                    title={item.title}
                  />
                </li>
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box px={2} py={3}>
          <SideNavItem
            variant="button"
            icon={<Logout />}
            title="Log out"
            onClick={logout}
          />
        </Box>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
