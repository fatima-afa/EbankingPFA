import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExceptionOutlined,
  UserOutlined,
  FileTextOutlined,
  CommentOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme,Divider, Dropdown, Avatar, Modal } from 'antd';
import logo from '../../Assets/logo.png';

const { Header, Sider, Content } = Layout;

const SideBar = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (item) => {
    if (item.key === 'logout') {
      // Mettez ici la logique de déconnexion
      console.log('Déconnexion de l\'utilisateur');
    } else if (item.key === 'informations') {
      // Mettez ici la logique pour afficher les informations de profil
      console.log('Afficher les informations du profil');
    }
  };
 
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const showProfileModal = () => {
    setProfileModalVisible(true);
  };
  const handleOk = () => {
    setProfileModalVisible(false);
  };
  const handleCancel = () => {
    setProfileModalVisible(false);
  };
  const profileModalContent = (
    <Modal
      title="Informations du Profil"
      visible={isProfileModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ style: { backgroundColor: '#EB5B31' } }}
      cancelButtonProps={{ style: { display: 'none' } }}  // Cacher le bouton Annuler
      style={{
        textAlign:'center'
      }}
      >
      {/* Contenu de la fenêtre modale */}
      <div>
        <p>
        <span className="span" style={{color:'#EB5B31'}}>
          Nom et prenom:
          <br />
        </span>
        leghris najwa</p>
        <p>
        <span className="span" style={{color:'#EB5B31'}}>
          Agence:
          <br />
        </span> Casablanca</p>
        <p>
        <span className="span" style={{color:'#EB5B31'}}>
          Email:
          <br />
        </span>najwaleghris@example.com</p>
        <p><span className="span" style={{color:'#EB5B31'}}>
        Numéro de téléphone
          <br />
        </span> 069481888</p>
      </div>
    </Modal>
  );
  
  const menu = (
    <Menu
    //  onClick={handleMenuClick}
     >
      <Menu.Item key="information" onClick={showProfileModal}>
        Mes informations
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined/>}>
        Se déconnecter
      </Menu.Item>
    </Menu>
  );
  
  return (
    <Layout>
      <Header
          style={{
            background: colorBgContainer,
            // height: 64,
            // paddingInline: 50,
            // lineHeight: '64px',
          }}
        >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" width={40} />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
          </div>
          <Dropdown overlay={menu} trigger={['hover']}>
            <Button type="text" style={{ fontSize: '16px' }}>
            <Avatar style={{ backgroundColor: '#EB5B31' }} icon={<UserOutlined />} />
            </Button>
          </Dropdown>
          {profileModalContent}
        </div>
      </Header>
      <Layout hasSider>
        <Sider trigger={null} collapsible collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          background:'#EB5B31',
          }}>
        <div className="demo-logo-vertical" />
        <div style={{padding: '20px', color: 'white' ,textAlign:'center'}}>
          Espace
          BANQUE
          <Divider />
        </div>
        <Menu
        style={

          {
          background: '#EB5B31',
          color:'white'
        }}
          theme="none"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <FileTextOutlined />,
              label: 'Contrats d’abonnement',
              children:[
                {
                  label: "Création d'une contrat",
                  key:"/admin/addUser",
                },
                {
                  label: "Gérer les contrats",
                  icon: "",
                  key:"/user/admin/manageUsers",
                },
              ],
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Abonnés',
              children:[
                {
                  label: "Enrollemnent des abonnées",
                  icon: "",
                  key:"/admin/addUser",
                },
                {
                  label: "Gérer les Abonnées",
                  icon: "",
                  key:"/user/admin/manageUsers",
                },
              ],
            },
            {
              key: '3',
              icon: <CommentOutlined />,
              label: 'Messagerie',
            },
            {
              key: '4',
              icon: <ExceptionOutlined />,
              label: 'Réclamations',
            },
          ]}
        />
      </Sider>
      {/* just a test */}
      <Content style={{
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#108ee9',
      }}>
        heloooo
      </Content>
      </Layout>
    </Layout>
  );
};
export default SideBar;