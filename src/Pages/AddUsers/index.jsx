import React, { useState } from 'react';
import { Form, Input, Select, Button,  Row, Col, Space, DatePicker} from 'antd';
import {AppstoreAddOutlined, UserAddOutlined } from "@ant-design/icons"
import axios from 'axios'
import { redirect } from 'react-router-dom';
//import { createUser } from "../../API";

const createUser = (user) => {
  axios.post('http://localhost:8888/user/admin', user)
    .then(response => {
      // Handle the response data if needed
      console.log(response.data);
    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });
};

const { Option } = Select;
class Agent {
  constructor(id, nom, prenom, email, adresse, ville,nomUtilisateur, dateNaissance, matricule, CIN, agence, statut,password, sexe, profileDto) {
    this.id=null;
   // this.type = 'agent';
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.adresse = adresse;
    this.dateNaissance=dateNaissance;
    this.matricule=matricule;
    this.CIN=CIN;
    this.agence=agence;
    this.ville=ville;
    this.statut=statut;
    this.nomUtilisateur=nomUtilisateur;
    this.password=password;
    this.sexe=sexe;
    this.profileDto=profileDto;

  }
}

class Admin {
  constructor(id,nom, prenom, email, adresse,nomUtilisateur, dateNaissance, matricule, CIN, agence, statut,password, sexe, profileDto) {
   // this.type = 'admin';
   this.id=null;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.adresse = adresse;
    this.dateNaissance=dateNaissance;
    this.matricule=matricule;
    this.CIN=CIN;
    this.agence=agence;
    this.statut=statut;
    this.nomUtilisateur=nomUtilisateur;
    this.password=password;
    this.sexe=sexe;
    this.profileDto=profileDto;
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
      user = new Agent(null,values.nom, values.prenom, values.email, values.adresse, values.ville, values.nomUtilisateur, values.dateNaissance, values.matricule, values.CIN, values.agence, values.statut,'', values.sexe, null);
    
    } else {
      user = new Admin(null,values.nom, values.prenom, values.email, values.adresse, values.nomUtilisateur, values.dateNaissance, values.matricule, values.CIN, values.agence, values.statut,'', values.sexe, null);
      console.log('Form user:', user);
      createUser(user)
      .then(response => {
        // Handle the response
        console.log('User created:', response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error creating user:', error);
      });
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
            <Form.Item label="nom utilisateur" name="nomUtilisateur" rules={[{ required: true, message: 'Veuillez entrer nom d\'utilisateur' }]}>
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
        <Form.Item label="Sexe" name="sexe" rules={[{ required: true, message: 'Veuillez sélectionner le sexe' }]}>
          <Select placeholder="Sélectionner le sexe">
            <Option value="Femme">Femme</Option>
            <Option value="Homme">Homme</Option>
          </Select>
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
        <Form.Item label="Statut" name="statut" rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}>
          <Select placeholder="Sélectionner le statut">
            <Option value="Enable">Enable</Option>
            <Option value="Disable">Disable</Option>
          </Select>
        </Form.Item>
      </Col>
      {userType === 'agent' && (
         
            <Col span={12}>
              <Form.Item label="Ville" name="ville" rules={[{ required: true, message: 'Veuillez entrer la ville' }]}>
                <Input />
              </Form.Item>
            </Col>
         
        )}
          
        </Row>


      

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