import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import AddUsers from "../../Pages/AddUsers"
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import ManageUsers from "../../Pages/ManageUsers";
import Devises from "../../Pages/Devises";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/user/admin/addUser" element={<AddUsers />}></Route>
      <Route path="/user/admin/manageUsers" element={<ManageUsers />}></Route>
      <Route path="/admin/devise" element={<Devises />}></Route>



    </Routes>
  );
}
export default AppRoutes;
