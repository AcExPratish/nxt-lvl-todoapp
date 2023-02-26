import Todo from "../pages/Todo";
import TodoForm from "../pages/TodoForm";

export const AUTHENTICATED_ROUTES = [
  { path: "/todo", element: <Todo /> },
  { path: "/todo/store", element: <TodoForm /> },
  { path: "/todo/:id", element: <TodoForm /> },
];
