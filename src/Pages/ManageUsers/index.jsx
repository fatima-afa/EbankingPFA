
import React, { useState ,useEffect} from 'react';
import { Table, Button, Select, Input,Space } from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons"
import AppHeader from '../../Components/AppHeader';
import { getAdmins, getAllBOs } from '../../API'; // Assuming you have API functions to fetch admins and agents


const { Option } = Select;

function ManageUsers() {
  
  const [filterBy, setFilterBy] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      width: 10,
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
    },
    {
      title: 'nom Utilisateur',
      dataIndex: 'nomUtilisateur',
      key: 'nomUtilisateur',
      width: 80,
    },
    {
      title: 'matricule',
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
      title: 'adresse',
      dataIndex: 'adresse',
      key: 'adresse',
      width: 80,
    },
    {
      title: 'date Naissance',
      dataIndex: 'dateNaissance',
      key: 'dateNaissance',
      width: 80,
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      width: 80,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Space>
            <Button type="primary" size="small" onClick={() => handleEdit(record.id)}>
              <EditOutlined />
            </Button>
            <Button style={{ color: `red` }} type="danger" size="small" onClick={() => handleDelete(record.id)}>
              <DeleteOutlined />
            </Button>
          </Space>
        </span>
      ),
      width: 80,
    },
  ];

  useEffect(() => {
    // Fetch data from your API when the component mounts
    async function fetchData() {
      try {
        let data;
        if (filterBy === 'Admin') {
          data = await getAdmins(); // Fetch admins
        } else if (filterBy === 'Agent') {
          data = await getAllBOs(); // Fetch agents or BOs
        } else {
          // Handle the case where 'all' is selected
          data = await getAdmins(); // Fetch admins by default
        }
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [filterBy]); // Update data when filterBy changes

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
    let filteredResult = filteredData;

    if (filterBy !== 'all') {
      filteredResult = filteredResult.filter((user) => user.statut === filterBy);
    }

    if (searchText !== '') {
      filteredResult = filteredResult.filter(
        (user) =>
          user.nom.toLowerCase().includes(searchText.toLowerCase()) ||
          user.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
          user.nomUtilisateur.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
        // Add more filters based on your properties
      );
    }

    setFilteredData(filteredResult);
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
       <h2>Gérer les utilisateurs</h2>
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
          style={{ width: 250, marginRight: 8 }}
        />
      </div>

      <div>
        <Table dataSource={filteredData} columns={columns} />
      </div>
  </div>
  
  </>
}

export default ManageUsers;
