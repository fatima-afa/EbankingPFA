import {
  UsergroupAddOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/admin/addUser");

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
                key:"/admin/addUser",
              },
              {
                label: "Gérer les utilisateurs",
                icon: "",
                key:"/admin/manageUsers",
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
            label: "Orders",
            key: "/orders",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Customers",
            key: "/customers",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;