import Login from "../pages/Login";
import Register from "../pages/Register";

export const PUBLIC_ROUTES = [
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
];
