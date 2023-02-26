import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRoute from "./routes";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div id="container">
        <AppRoute />
      </div>
    </>
  );
};
export default App;
