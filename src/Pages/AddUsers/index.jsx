import React, { useState } from 'react';
import { Form, Input, Select, Button,  Row, Col, Space, DatePicker} from 'antd';
import {AppstoreAddOutlined, UserAddOutlined } from "@ant-design/icons"
import { redirect } from 'react-router-dom';

const { Option } = Select;
class Agent {
  constructor(nom, prenom, email, adresse, ville, userName, dateNaissance, matricule, CIN, agence, statut) {
    this.type = 'agent';
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.adresse = adresse;
    this.userName=userName;
    this.dateNaissance=dateNaissance;
    this.matricule=matricule;
    this.CIN=CIN;
    this.agence=agence;
    this.ville=ville;
    this.statut=statut;
  }
}

class Admin {
  constructor(nom, prenom, email, adresse, ville, userName, dateNaissance, matricule, CIN, agence, statut) {
    this.type = 'admin';
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.adresse = adresse;
    this.ville = ville;
    this.userName=userName;
    this.dateNaissance=dateNaissance;
    this.matricule=matricule;
    this.CIN=CIN;
    this.agence=agence;
    this.statut=statut;
  }
}

function AddUser() {

  
  const [userType, setUserType] = useState('admin');

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    let user;
    if (userType === 'agent') {
      user = new Agent(values.nom, values.prenom, values.email, values.adresse, values.ville, values.userName, values.dateNaissance, values.matricule, values.CIN, values.agence, values.statut);
    } else {
      user = new Admin(values.nom, values.prenom, values.email, values.adresse, values.ville, values.userName, values.dateNaissance, values.matricule, values.CIN, values.agence, values.statut);
    }

    console.log('User object:', user);
    // Vous pouvez maintenant utiliser l'objet 'user' selon vos besoins (par exemple, l'envoyer au serveur)
  };

  return <>
  <Space>
  <AppstoreAddOutlined style={{color: `orange`, fontSize: 22}}/>
  <h3 style={{color: `orange`}}>Ajouter un utilisateur</h3>
  </Space>
  
    <div>
      <Form name="userForm" layout="vertical" onFinish={onFinish}>
        <Form.Item label="Type d'utilisateur">
          <Select onChange={handleUserTypeChange} value={userType}>
            <Option value="agent">Agent</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Row gutter={30}>
          <Col span={12}>
            <Form.Item label="Nom" name="nom" rules={[{ required: true, message: 'Veuillez entrer le nom' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="nom utilisateur" name="userName" rules={[{ required: true, message: 'Veuillez entrer nom d\'utilisateur' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
        <Col span={12}>
            <Form.Item label="Prénom" name="prenom" rules={[{ required: true, message: 'Veuillez entrer le prénom' }]}>
              <Input />
            </Form.Item>
          </Col>
          
          <Col span={12}>
                <Form.Item label="Date de Naissance" name="dateNaissance" rules={[{ required: true, message: 'Veuillez choisir la date de naissance' },{type:'date'}]}>
                      <DatePicker style={{ width: '100%' }} />
                 </Form.Item>
            </Col>

        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Veuillez entrer l\'email' }, { type: 'email', message: 'Veuillez entrer un email valide' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Matricule" name="matricule" rules={[{ required: true, message: 'Veuillez entrer  matricule' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="CIN" name="CIN" rules={[{ required: true, message: 'Veuillez entrer CIN' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Adresse" name="adresse" rules={[{ required: true, message: 'Veuillez entrer l\'adresse' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Ville" name="ville" rules={[{ required: true, message: 'Veuillez entrer la ville' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Agence" name="agence" rules={[{ required: true, message: 'Veuillez entrer l\'agence' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Statut" name="statut" rules={[{ required: true, message: 'Veuillez entrer le statut' }]}>
              <Input />
            </Form.Item>
          </Col>
          
        </Row>


       { /*{userType === 'admin' && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ville" name="ville" rules={[{ required: true, message: 'Veuillez entrer la ville' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        )}*/}

        <br/>
        <Form.Item >
          <Button  style={{backgroundColor: `orange`}} type="primary" htmlType="submit">
            Enregistrer
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
};

export default AddUser