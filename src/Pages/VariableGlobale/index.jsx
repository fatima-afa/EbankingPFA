// import { Button,Table ,Avatar} from "antd";
// import {DeleteOutlined, EditOutlined} from "@ant-design/icons"
// import { useEffect, useState } from "react";
// import "./form";
import AppHeader from "../../Components/AppHeader/index";
// import "./style.css";
import { Link,NavLink } from 'react-router-dom';



  function VariableGlobale(){
  return (
    <>
      <AppHeader />
      <div className="title">
       <h2>Les Variables Globales</h2>
       <NavLink  to="/admin/VariableGlobale">Ajouter une VariableGlobale</NavLink>
      </div>
      
      <div className="table-filter d-flex">
          <span>En cours de préparation...</span>
      </div>

      
    </>
  );
}
export default VariableGlobale;