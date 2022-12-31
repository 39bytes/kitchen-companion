import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export interface EmailPasswordInput {
  email: string;
  password: string;
}

export interface User {
  __v: number;
  _id: string;
  email: string;
  password: string;
}

export const authContext = createContext<User | undefined>(undefined);

export const useAuth = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }: PropsWithChildren<any>) => {
  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState("pending");

  // TODO: Fix this not firing before the auth check on login when using navigate
  // Maybe hook useEffect to location.key?
  useEffect(() => {
    setStatus("pending");
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/auth/user", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setStatus("success");
      });
  }, []);

  return status === "pending" ? (
    <div>"Loading..."</div>
  ) : (
    <authContext.Provider value={user}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
