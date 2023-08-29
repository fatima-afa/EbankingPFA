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

      <Route path="/" element={<AddUsers />}></Route> 
      <Route path="/admin" element={<Login />}></Route>
      <Route path="/user/admin/addUser" element={<AddUsers />}></Route>
      <Route path="/user/admin/manageUsers" element={<ManageUsers />}></Route>
      <Route path="/admin/devise" element={<Devise/>}></Route>
      <Route path="/admin/manageDevise" element={<ManageDevise />} ></Route>
      <Route path="/admin/manageDevise/:id" element={<ManageDevise />} ></Route>
      <Route path="/admin/variableGlobale" element={<VariableGlobale />} ></Route>

    </Routes>
  );
}
export default AppRoutes;
