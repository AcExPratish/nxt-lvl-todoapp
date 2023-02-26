import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getAccessToken } from "../plugins/token";
import { PUBLIC_ROUTES } from "../modules/auth/routes";

const AuthRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getAccessToken()
  );
  const route = useLocation().pathname;

  useEffect(() => {
    setIsAuthenticated(getAccessToken());
  }, [route]);

  console.log("isAuth", isAuthenticated);

  return (
    <>
      <Routes>
        {!isAuthenticated ? (
          PUBLIC_ROUTES.map((v, key) => (
            <Route path={v.path} element={v.element} key={key} />
          ))
        ) : (
          <Route element={<Navigate to={"/todo"} />} />
        )}
      </Routes>
    </>
  );
};

export default AuthRoute;
