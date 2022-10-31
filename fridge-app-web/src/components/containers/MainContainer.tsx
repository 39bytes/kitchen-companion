import { Container } from "@mui/system";
import React from "react";
import theme from "../../theme";

type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <Container
      sx={{
        width: `calc(100vw - ${theme.spacing(30)})`,
        left: theme.spacing(28),
        height: "100vh",
        position: "relative",
      }}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
