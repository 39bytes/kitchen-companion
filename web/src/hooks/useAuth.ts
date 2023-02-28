import { useContext } from "react";
import { authContext } from "src/components/AuthProvider";

export const useAuth = () => {
  return useContext(authContext);
};
