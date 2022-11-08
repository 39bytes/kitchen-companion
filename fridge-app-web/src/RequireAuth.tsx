import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

type ProtectedRouteProps = {
  children: React.ReactNode;
  redirectTo: string;
};

const RequireAuth = ({ children, redirectTo }: ProtectedRouteProps) => {
  const auth = useAuth();

  return auth ? <>{children}</> : <Navigate to={redirectTo} />;
};

export default RequireAuth;
