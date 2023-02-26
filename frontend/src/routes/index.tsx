import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { getAccessToken } from "../plugins/token";
import AuthRoutes from "./AuthRoutes";
import PrivateRoutes from "./PrivateRoutes";

const AppRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getAccessToken()
  );
  const defaultPath = isAuthenticated ? "/todo" : "/auth";
  const route = useLocation().pathname;

  useEffect(() => {
    setIsAuthenticated(getAccessToken());
  }, [route]);

  return (
    <Routes>
      <Route
        path="/auth/*"
        element={!isAuthenticated ? <AuthRoutes /> : <Navigate to={"/todo"} />}
      ></Route>
      <Route
        path={"/*"}
        element={
          isAuthenticated ? <PrivateRoutes /> : <Navigate to={"/auth"} />
        }
      ></Route>
      <Route path="*" element={<Navigate to={defaultPath} />}></Route>
    </Routes>
  );
};

export default AppRoute;
