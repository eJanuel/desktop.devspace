import { Navigate } from "react-router-dom";
import { AppLayout } from "../../../app.layout";
import { useAppSelector } from "../../../hooks/redux/hooks";
import { RootState } from "../../../store";

export const PrivateRoutes = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? <AppLayout /> : <Navigate to={"login"} />;
};
