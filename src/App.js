import "./App.css";
import { ToastContainer } from "react-toastify";
import Routing from "./Routing";
import OrderTracking from "./components/order/Order";

export default function App() {
  document.title = "Mobile Planet";

  return (
    <div>
      <ToastContainer />
      <Routing />
      <OrderTracking/>
    </div>
  );
}
