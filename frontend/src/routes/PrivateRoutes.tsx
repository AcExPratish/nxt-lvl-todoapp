import { Routes, Route } from "react-router-dom";
import { AUTHENTICATED_ROUTES } from "../modules/todo/routes";
const PrivateRoute = () => {
  return (
    <>
      {
        <Routes>
          {AUTHENTICATED_ROUTES.map((v, key) => (
            <Route path={v.path} element={v.element} key={key} />
          ))}

          <Route
            path="*"
            element={
              <p style={{ fontSize: "5rem", fontWeight: "bold" }}>
                Page Not Found
              </p>
            }
          />
        </Routes>
      }
    </>
  );
};

export default PrivateRoute;
