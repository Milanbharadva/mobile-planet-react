import "./App.css";
import { ToastContainer } from "react-toastify";
import Routing from "./Routing";

export default function App() {
  document.title = "Mobile Planet";

  return (
    <div>
      <ToastContainer />
      <Routing />
    </div>
  );
}
