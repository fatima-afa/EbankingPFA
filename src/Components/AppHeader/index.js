import {MenuOutlined, BellFilled, MailOutlined ,LogoutOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
// import { getComments, getOrders } from "../../api";
import './AppHeader.css';

import SideMenu from "../SideMenu/index"

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar

//   useEffect(() => {
//     getComments().then((res) => {
//       setComments(res.comments);
//     });
//     getOrders().then((res) => {
//       setOrders(res.products);
//     });
//   }, []);

  return (
    <div className="header d-flex">
        <div className="mr-auto p-2 header-left">
        <div className="">
          <img src="../../Assets/logo.png"></img>
        </div>
          <MenuOutlined
             className="sidebar-icon"
              style={{ fontSize: 24 }}
              onClick={() => {
                setSidebarOpen(true);
              }}
            />
        </div>

        <div className="p-2 d-flex header-right">
          <div className="p-2">
          <Badge count={orders.length}>
            <BellFilled
              style={{ fontSize: 20 }}
              onClick={() => {
                setNotificationsOpen(true);
              }}
            />
          </Badge>
          </div>
          <div className="p-2">
          <Badge count={comments.length} dot>
            <LogoutOutlined
              style={{ fontSize: 20 }}
              onClick={() => {
                setCommentsOpen(true);
              }}
            /> <span style={{ fontSize: 10 }}>LOGOUT</span>
          </Badge>
          </div>
        </div>
      

      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>

      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>

      </Drawer>

      <Drawer
        title="Hi admin !"
        placement="left" // Set the placement to "left"
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        maskClosable
        width={300}
      >
        <SideMenu />
      </Drawer>
    </div>
  );
}
export default AppHeader;