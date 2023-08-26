import {
  UsergroupAddOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/user/admin/addUser");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          // item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Utilisateurs",
            icon: <UsergroupAddOutlined />,
            key: "users",
            children:[
              {
                label: "Ajouter un utilisateur",
                icon: "",
                key:"/user/admin/addUser",
              },
              {
                label: "Gérer les utilisateurs",
                icon: "",
                key:"/user/admin/manageUsers",
              },
            ],
          },
          {
            label: "Devises",
            key: "currencies",
            icon: <ShopOutlined />,
            children:[
              {
                label: "Ajouter une devise",
                icon: "",
                key:"/admin/manageDevise",
              },
              {
                label: "Gérer les devises",
                icon: "",
                key:"/admin/devise",
              },
            ],
          },
          {
            label: "Variables globales",
            key: "/variableGlobales",
            icon: <SettingOutlined />,
            children:[
              {
                label: "Ajouter une variable globale",
                icon: "",
                key:"/admin/VariableGlobale",
              },
              {
                label: "Gérer les variables globales",
                icon: "",
                key:"/admin/VariableGlobale",
              },
            ],
          }
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;