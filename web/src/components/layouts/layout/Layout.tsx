import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

const SIDENAV_WIDTH = 280;

type LayoutProps = {
  children: React.ReactNode;
};

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDENAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
  minHeight: "100vh",
  paddingLeft: 24,
  backgroundColor: "#f4f6f8",
});

export const Layout = ({ children }: LayoutProps) => {
  const [openNav, setOpenNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [location.pathname, openNav]);

  return (
    <>
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <TopNav onNavOpen={() => console.log("open")} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};

export default Layout;
