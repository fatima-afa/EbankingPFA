import React, { useState } from 'react';
import { Form, Input, Select, Button,  Row, Col, Space, DatePicker} from 'antd';
import {AppstoreAddOutlined, UserAddOutlined } from "@ant-design/icons"
import axios from 'axios'
import { redirect } from 'react-router-dom';
<<<<<<< HEAD
//import { createUser } from "../../API";


=======
import AppHeader from '../../Components/AppHeader';
>>>>>>> 5148c50f9db77448fb054abcc3c5ecb94509a886

const { Option } = Select;
class Agent {
  constructor(id, nom, prenom, email, adresse, ville,nomUtilisateur, dateNaissance, matricule, cin, agenceDto, statut,password, sexe, profileDto) {
    this.id=id;
   // this.type = 'agent';
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.adresse = adresse;
    this.dateNaissance=dateNaissance;
    this.matricule=matricule;
    this.cin=cin;
    this.agenceDto=agenceDto;
    this.ville=ville;
    this.statut=statut;
    this.nomUtilisateur=nomUtilisateur;
    this.password=password;
    this.sexe=sexe;
    this.profileDto=profileDto;

  }
}

class Admin {
  constructor(id,nom, prenom, email, adresse,nomUtilisateur, dateNaissance, matricule, cin, agenceDto, statut,password, sexe, profileDto) {
   // this.type = 'admin';
    this.id=id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.adresse = adresse;
    this.dateNaissance=dateNaissance;
    this.matricule=matricule;
    this.cin=cin;
    this.agenceDto=agenceDto;
    this.statut=statut;
    this.nomUtilisateur=nomUtilisateur;
    this.password=password;
    this.sexe=sexe;
    this.profileDto=profileDto;
  }
}
const createAdmin = (user) => {
  return fetch('http://localhost:8888/user/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000'
    },
    body: JSON.stringify(user),
  })
    .then(response => {
      if (!response.ok) {
        console.log("fron here : ",response)

        throw new Error('Network response was not ok');
      }
      console.log("from here : ",response)
      return response.json();
    });
};



function AddUser() {

  
  const [userType, setUserType] = useState('admin');

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    if (userType === 'agent') {
     const user = new Agent(null,values.nom,values.prenom, values.email, values.adresse, values.ville, values.nomUtilisateur, values.dateNaissance, values.matricule, values.CIN, null, values.statut,'', values.sexe, null);
    
    } else {
     const user = new Admin(null,values.nom, values.prenom, values.email, values.adresse, values.nomUtilisateur, values.dateNaissance, values.matricule, values.CIN, null, values.statut,'', values.sexe, null);
     // const t =new Admin(null,"hna","hihihihi",null,null,null,null,null,null,null,null,null,null,null)
      console.log('Form user:', user);
      createAdmin(user)
      .then(createdAdmin => {
   // Handle the response
       console.log('Admin created:', createdAdmin);
        })
       .catch(error => {
   // Handle errors
   console.log('Admin not created:', user);
      console.error('Error creating Admin:', error);
  
  });
    
    }

    //console.log('User object:', user);
    // Vous pouvez maintenant utiliser l'objet 'user' selon vos besoins (par exemple, l'envoyer au serveur)
    
  };

  return <>
  <AppHeader />
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