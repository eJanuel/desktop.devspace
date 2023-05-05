import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux/hooks";
import { RootState } from "../../../store";
import AuthLayout from "./auth.layout";

export const AuthRoutes = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return !isAuthenticated ? <AuthLayout /> : <Navigate to={"/"} />;
};
