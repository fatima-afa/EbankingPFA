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
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Utilisateurs",
            icon: <UsergroupAddOutlined />,
            key: "",
            children:[
              {
                label: "Ajouter un utilisateur",
                icon: "",
                key:"/user/admin/addUser",
              },
              {
                label: "Gerer les utilisateurs",
                icon: "",
                key:"/user/admin/manageUsers",
              },
            ],
          },
          {
            label: "Devises",
            key: "/admin/devise",
            icon: <ShopOutlined />,
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
