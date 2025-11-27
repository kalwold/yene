import "./App.css";
import { Sidebar } from "./components/Sidebar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OTP from "./pages/Auth/otp";
import Dashboard from "./pages/systemAdmin/Dashboard";
import Frame from "./components/Frame";
import ProtectedRoutes from "./context/ProtectedRoutes";
import Logout from "./pages/Auth/Logout";
import CustomerManagement from "./pages/systemAdmin/CustomerManagement";
import OrderManagement from "./pages/systemAdmin/OrderManagement";
import LaundryManagement from "./pages/systemAdmin/LaundryManagement";
import ServicesAndPricing from "./pages/systemAdmin/ServicesManagement";
import Items from "./pages/systemAdmin/Items";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<OTP />} />

      
      <Route
        element={
          <ProtectedRoutes>
            <Frame />
          </ProtectedRoutes>
        }
      >
          {/* <Route
        element={
         
            <Frame />
       
        }
      > */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/customers" element={<CustomerManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/laundry" element={<LaundryManagement />} />
        <Route path="/admin/services" element={<ServicesAndPricing />} />
        <Route path="/admin/items" element={<Items />} />

      </Route>
    </Routes>
  );
}

export default App;
