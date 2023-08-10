import React, { useState } from 'react';
import { Table, Button, Select, Input } from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons"
import AppHeader from '../../Components/AppHeader';

const { Option } = Select;

const data = [
  {
    id: 1,
    nom: 'mohammed',
    prenom: 'marouane',
    email: 'med@ex.om',
    adresse: '123 ma',
    ville: 'New York',
    userName: 'med.mar',
    dateNaissance: '1990-01-01',
    matricule: '1234',
    CIN: 'ABC12',
    agence: 'Agence 1',
    statut: 'Admin',
  },
  {
    id: 1,
    nom: 'fatima',
    prenom: 'afa',
    email: 'afa@exp.com',
    adresse: 'guelmim St',
    ville: 'guelmim',
    userName: 'fati.afa',
    dateNaissance: '2000-01-01',
    matricule: '123456',
    CIN: 'ABC123',
    agence: 'Agence 1',
    statut: 'Admin',
  },
  {
    id: 1,
    nom: 'nejwa',
    prenom: 'leghrissi',
    email: 'nej@example.com',
    adresse: 'bni malal',
    ville: 'bni malal',
    userName: 'nejwa.leghrissi',
    dateNaissance: '2000-01-01',
    matricule: '123456',
    CIN: 'ABC123',
    agence: 'Agence 1',
    statut: 'Agent',
  },
];
function ManageUsers() {
  
  const [filterBy, setFilterBy] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      width: 80,
    },
    {
      title: 'Rôle',
      key: 'role',
      render: (text, record) => {
        return record.statut === 'Admin' ? 'Admin' : 'Agent';
      },
      width: 80,
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      width: 80,
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
      width: 80,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 80,
      size:5,
    },
    {
      title: 'Adresse',
      dataIndex: 'adresse',
      key: 'adresse',
      width: 80,
    },
    {
      title: 'Ville',
      dataIndex: 'ville',
      key: 'ville',
      width: 80,
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userName',
      width: 80,
    },
    {
      title: 'Date de Naissance',
      dataIndex: 'dateNaissance',
      key: 'dateNaissance',
      width: 80,
    },
    {
      title: 'Matricule',
      dataIndex: 'matricule',
      key: 'matricule',
      width: 80,
    },
    {
      title: 'CIN',
      dataIndex: 'CIN',
      key: 'CIN',
      width: 80,
    },
    {
      title: 'Agence',
      dataIndex: 'agence',
      key: 'agence',
      width: 80,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button  type="primary" size="small" onClick={() => handleEdit(record.id)}><EditOutlined /></Button>
          <Button style={{color: `red`}} type="danger" size="small" onClick={() => handleDelete(record.id)}><DeleteOutlined /></Button>
        </span>
      ),
      width: 100,
    },
  ];

  const handleFilterChange = (value) => {
    setFilterBy(value);
    filterData(value, searchText);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    filterData(filterBy, value);
  };

  const filterData = (filterBy, searchText) => {
    let filteredData = data;
    if (filterBy !== 'all') {
      filteredData = data.filter((user) => user.statut === filterBy);
    }
    if (searchText !== '') {
      filteredData = filteredData.filter(
        (user) =>
          user.nom.toLowerCase().includes(searchText.toLowerCase()) ||
          user.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
          user.userName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredData(filteredData);
  };

  const handleEdit = (userId) => {
    console.log(`Editing user with ID: ${userId}`);
  };

  const handleDelete = (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
  };
  return <>
  <AppHeader />
  <div className="title">
       <h2>Les devises</h2>
  </div>
  <div className='container' style={{ margin:'0px 20px' ,display:'flex' , flexDirection:'space-between' }}>
      <div style={{ margin:'15px' }}>
        <Select value={filterBy} onChange={handleFilterChange} style={{ marginRight:'8px'}}>
          <Option value="all">Tous</Option>
          <Option value="Admin">Admin</Option>
          <Option value="Agent">Agent</Option>
        </Select>
        <Input
          placeholder="Rechercher"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 200, marginRight: 8 }}
        />
      </div>
      <div>
        <Table dataSource={filteredData} columns={columns} />
      </div>
  </div>
  
  </>
}

export default ManageUsers;