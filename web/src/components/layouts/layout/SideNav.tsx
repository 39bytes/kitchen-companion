import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "./Logo";
import navData from "./navData";
import { SideNavItem } from "./SideNavItem";
import { useTheme } from "@mui/system";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Scrollbar } from "./Scrollbar";
import axios from "axios";
import { Logout } from "@mui/icons-material";

type SideNavProps = {
  open: boolean;
  onClose: () => void;
};

export const SideNav = ({ open, onClose }: SideNavProps) => {
  const theme = useTheme();
  const location = useLocation();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const logout = async () => {
    await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/auth/logout",
      {},
      { withCredentials: true }
    );
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
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                Devias
              </Typography>
              <Typography color="neutral.400" variant="body2">
                Production
              </Typography>
            </div>
          </Box>
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
