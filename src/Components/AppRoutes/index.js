import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import AddUsers from "../../Pages/AddUsers"
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import ManageUsers from "../../Pages/ManageUsers";
import Devise from "../../Pages/Devises";
import ManageDevise from "../../Pages/Devises/form";
import Login from "../../Pages/Login";
import VariableGlobale from "../../Pages/VariableGlobale";

function AppRoutes() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/user/admin/addUser" element={<AddUsers />}></Route>
      <Route path="/user/admin/manageUsers" element={<ManageUsers />}></Route>
      <Route path="/admin/devise" element={<Devises />}></Route>


=======
      {/* <Route path="/" element={<Dashboard />}></Route> */}
      <Route path="/admin" element={<Login />}></Route>
      <Route path="/admin/addUser" element={<AddUsers />}></Route>
      <Route path="/admin/manageUsers" element={<ManageUsers />}></Route>
      <Route path="/admin/devise" element={<Devise/>}></Route>
      <Route path="/admin/manageDevise" element={<ManageDevise />} ></Route>
      <Route path="/admin/manageDevise/:id" element={<ManageDevise />} ></Route>
      <Route path="/admin/variableGlobale" element={<VariableGlobale />} ></Route>
>>>>>>> 5148c50f9db77448fb054abcc3c5ecb94509a886

    </Routes>
  );
}
export default AppRoutes;
