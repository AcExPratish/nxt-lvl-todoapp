import { useState, useEffect } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { getAccessToken } from "../plugins/token";

interface PrivateRoutesProps {
  element: any;
  path: string;
}

const AuthRoute = ({ element, path }: PrivateRoutesProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getAccessToken()
  );
  const route = useLocation().pathname;

  useEffect(() => {
    setIsAuthenticated(getAccessToken());
  }, [route]);

  return !isAuthenticated ? (
    <Route element={element} path={path} />
  ) : (
    <Route element={<Navigate to="/todo" />} />
  );
};

export default AuthRoute;
