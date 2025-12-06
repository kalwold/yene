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
import ServicesManagement from "./pages/systemAdmin/ServicesManagement";
import ServicesAndPricing from "./pages/laundryAdmin/Service&Pricing";
import Items from "./pages/systemAdmin/Items";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LaundryAdminSetup from "./pages/laundryAdmin/setup";
import LaundryAdminDashboard from "./pages/laundryAdmin/Dashboard";
import OrderManagementLaundryAdmin from "./pages/laundryAdmin/OrderManagement";

function App() {

    const { user } = useContext(AuthContext); 
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

{/* admin Routes */}
        <Route path="/admin/dashboard"  element={user?.role === 'SYSTEM_ADMIN' ? <Dashboard /> : <Navigate to="/login" />}/>
        <Route path="/admin/customers" element={user?.role === 'SYSTEM_ADMIN'? <CustomerManagement /> : <Navigate to ="/login" /> } />
        <Route path="/admin/orders" element={user?.role === 'SYSTEM_ADMIN'?<OrderManagement />: <Navigate to ="/login" />} />
        <Route path="/admin/laundry" element={user?.role === 'SYSTEM_ADMIN'?<LaundryManagement />: <Navigate to ="/login" />} />
        <Route path="/admin/services" element={user?.role === 'SYSTEM_ADMIN'?<ServicesManagement />: <Navigate to ="/login" />} />
        <Route path="/admin/items" element={user?.role === 'SYSTEM_ADMIN'?<Items />: <Navigate to ="/login" />} />



{/* Laundry admin Routes */}
         <Route path="/laundryAdmin/setup"  element={<LaundryAdminSetup />}/>
          <Route path="/laundryAdmin/dashboard"  element={<LaundryAdminDashboard />}/>
          <Route path="/laundryAdmin/orders" element={<OrderManagementLaundryAdmin />} />
          <Route path="/laundryAdmin/services" element={<ServicesAndPricing />} /> 

      </Route>
    </Routes>
  );
}

export default App;
