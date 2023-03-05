import { styled } from "@mui/material";
import { useState } from "react";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

export const SIDENAV_WIDTH = 280;
export const TOPNAV_HEIGHT = 64;

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
  paddingLeft: 18,
  paddingRight: 18,
  backgroundColor: "#f4f6f8",
});

export const Layout = ({ children }: LayoutProps) => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};

export default Layout;
