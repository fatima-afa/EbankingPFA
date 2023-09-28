import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUsers from "../../Pages/Admin/AddUsers"
import ManageUsers from "../../Pages/Admin/ManageUsers";
import Devise from "../../Pages/Admin/Devises/index";
import ManageDevise from "../../Pages/Admin/Devises/form";
import Login from "../../Pages/Login";
import ParamsGlobale from "../../Pages/Admin/VariableGlobale";
import Param from "../../Pages/Admin/VariableGlobale/form";
import Sidebar from "../../Pages/BackOffice/index";


function AppRoutes() {
  return (
    <Routes>

      <Route path="/BackOffice" element={<Sidebar />}></Route> 
      <Route path="/admin" element={<Login />}></Route>
      <Route path="/admin/addUser" element={<AddUsers />}></Route>
      <Route path="/user/admin/manageUsers" element={<ManageUsers />}></Route>

      <Route path="/admin/devise" element={<Devise/>}></Route>
      <Route path="/admin/manageDevise" element={<ManageDevise />} ></Route>
      <Route path="/admin/manageDevise/:id" element={<ManageDevise />} ></Route>

      {/* <Route path="/admin/variableGlobale" element={<VariableGlobale />} ></Route>
      <Route path="/admin/manageParam/:id" element={<ManageParam />} ></Route> */}

      <Route path="/admin/ParamGlobale" element={<Param />} ></Route>
      <Route path="/admin/ParamGlobale/:id" element={<Param />} ></Route>
      <Route path="/admin/manageParam" element={<ParamsGlobale />} ></Route>
    </Routes>
  );
}
export default AppRoutes;
