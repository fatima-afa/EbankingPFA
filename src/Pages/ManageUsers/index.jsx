import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Input, Space, Modal,Form } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getAdmins, getAllBOs } from '../../API'; // Assuming you have API functions to fetch admins and agents
import AppHeader from '../../Components/AppHeader';
import axios from 'axios';


const { Option } = Select;

function ManageUsers() {
  class Agent {
    constructor(id, nom, prenom, email, adresse, ville,nomUtilisateur, dateNaissance, matricule, cin, agenceDto, statut,password, sexe, profileDto,type) {
      this.id=id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.type=type;
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
    constructor(id,nom, prenom, email, adresse,nomUtilisateur, dateNaissance, matricule, cin, agenceDto, statut,password, sexe, profileDto, type) {
     // this.type = 'admin';
      this.id=id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.adresse = adresse;
      this.type=type;
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
  
  const [filterBy, setFilterBy] = useState('admin');
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adresseValue, setAdresseValue] = useState('');
  const [statutValue, setStatutValue] = useState('');
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

  
    // State for the modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

      // Function to fetch user data by ID for Admin
  const fetchAdminDataById = async (userId) => {
    try {
      console.log("here");
      const response = await axios.get(`http://localhost:8888/user/admin/${userId}`);
      console.log("data to return ",response)
      return response.data;
    } catch (error) {
      console.error('Error fetching admin data:', error);
      throw error;
    }
  };

    // Function to fetch user data by ID for BO
    const fetchBODataById = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8888/user/bos/${userId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching BO data:', error);
        throw error;
      }
    };
  
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
            <Button type="primary" size="small" onClick={() => handleEdit(record)}>
              <EditOutlined />
            </Button>
            <Button style={{ color: `red` }} type="danger" size="small" onClick={() => handleDelete(record)}>
            {/* <Button style={{ color: `red` }} type="danger" size="small" onClick={() => ()=>{console.log(record.id)}}> */}
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

    //if (filterBy !== 'all') {
      //filteredResult = filteredResult.filter((user) => user.statut === filterBy);
    //}

    if (searchText !== '') {
      filteredResult = filteredResult.filter(
        (user) =>
        //  user.nom.toLowerCase().includes(searchText.toLowerCase()) ||
        //  user.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
          user.nomUtilisateur.toLowerCase().includes(searchText.toLowerCase()) 
        /// || user.email.toLowerCase().includes(searchText.toLowerCase())
        // Add more filters based on your properties
      );
    }

    setFilteredData(filteredResult);
  };

  //const handleEdit = (userId) => {
    //console.log(`Editing user with ID: ${userId}`);
  //};

  const handleEdit = async (user) => {
    try {
      let existingUserData;

      console.log("Fetching BO data for user ID:", user.id);
      existingUserData = await fetchAdminDataById(user.id);
      console.log("Fetching BO data for user type:", existingUserData.statut);
      if (user.type === 'bo' || user.type === 'BO') {
        existingUserData = await fetchBODataById(user.id);
              console.log("Fetching BO data for user ID:", user.id);
      } else if (user.type === 'admin' || user.type === 'Admin') {
        existingUserData = await fetchAdminDataById(user.id);
              console.log("Fetching BO data for user ID:", user.id);
      }
      console.log("Fetched user data:", existingUserData);

      setSelectedUser({ ...user, ...existingUserData });
      setAdresseValue(existingUserData.adresse); // Initialize the input values
      setStatutValue(existingUserData.statut);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error editing user:', error);
      console.log("adresse howa :",user.adresse);
    }
  };
  
  

  const handleModalOk = async () => {
    try {
      if (selectedUser.type === 'bo') {
        await axios.put(`http://localhost:8888/user/bos/${selectedUser.id}`, {
          adresse: adresseValue, // Use local state variables
          statut: statutValue,
          nom : selectedUser.nom,
          prenom: selectedUser.prenom,
          nomUtilisateur:selectedUser.nomUtilisateur,
          matricule:selectedUser.matricule,
          type:selectedUser.type,
          password:selectedUser.password,
          email:selectedUser.email,
          CIN:selectedUser.CIN,
          dateNaissance:selectedUser.dateNaissance,
          sexe:selectedUser.sexe,
          agenceDto:selectedUser.agenceDto,
          ProfileDto:selectedUser.ProfileDto,
          villeDto:selectedUser.villeDto,
          adminDto:selectedUser.adminDto,
        });
        console.log("adress ",adresseValue);
      } else if (selectedUser.type === 'admin') {
        const userr = new Admin(selectedUser.id,selectedUser.nom, selectedUser.prenom, selectedUser.email, adresseValue, selectedUser.nomUtilisateur, selectedUser.dateNaissance, selectedUser.matricule, selectedUser.CIN, null, statutValue,'', selectedUser.sexe, null);
        await axios.put(`http://localhost:8888/user/admin/${selectedUser.id}`, userr);
      
        console.log("adress ",adresseValue);
        console.log("email ",selectedUser.email);



      }
      console.log("after ok",selectedUser);
      setIsModalVisible(false);
      setSelectedUser(null);
      console.log("after ok",selectedUser);

     // fetchData();
      // Optional: Refetch data to update the table
      // try {
      //   let data;
      //   if (filterBy === 'Admin') {
      //     data = await getAdmins(); // Fetch admins
      //   } else if (filterBy === 'Agent') {
      //     data = await getAllBOs(); // Fetch agents or BOs
      //   } 
      //  // else {
      //     // Handle the case where 'all' is selected
      //   //  data = await getAdmins(); // Fetch admins by default
      //   //}
      //   setFilteredData(data);
      //   setLoading(false);
      // } catch (error) {
      //   console.error('Error fetching data:', error);
      // }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleModalCancel = () => {
    // Close the modal and reset selectedUser
    setIsModalVisible(false);
    setSelectedUser(null);
  };

 const handleDelete = (user) => {
  // Show the confirmation dialog
  Modal.confirm({
    title: 'Confirm Deletion',
    content: `Are you sure you want to delete user ${user.nom}?`,
    onOk: async () => {
      try {
        if (user.type === 'bo' || user.type === 'BO') {
          await axios.delete(`http://localhost:8888/user/bos/${user.id}`);
        } else if (user.type === 'admin' || user.type === 'Admin') {
          await axios.delete(`http://localhost:8888/user/admin/${user.id}`);
        }

        // After successful deletion, you can update the UI as needed.
        // For example, you can refetch the data to remove the deleted user from the table.
        // Add your data fetching logic here.

        // Log a success message or show a notification to the user.
        console.log(`User with ID ${user.id} has been deleted.`);
      } catch (error) {
        console.error('Error deleting user:', error);
        // Handle errors or show error notifications.
      }
    },
    onCancel: () => {
      // User canceled the deletion, no action required.
    },
  });
};



  return <>
  <AppHeader />
    <div>
      <div style={{ marginBottom: 16 }}>
        <Select value={filterBy} onChange={handleFilterChange} style={{ marginRight: 8 }}>

        {/* <Option value="all">all</Option> */}
          <Option value="Admin">Admin</Option>
          <Option value="Agent">Agent</Option>
        </Select>
        <Input
          placeholder="rchercher par nom utilsateur "
          value={searchText}
          onChange={handleSearch}
          style={{ width: 250, marginRight: 8 }}
        />
      </div>
      <Table dataSource={filteredData} columns={columns} loading={loading} />

       {/* Edit User Modal */}
    
       <Modal
          title="Modifier l'utilisateur"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
        {selectedUser && (
          <Form>
            <Form.Item label="Adresse">
            <Input
        value={adresseValue}
        onChange={(e) => setAdresseValue(e.target.value)}
      />

      </Form.Item>
      <Form.Item label="Statut">
          <Select
      placeholder="Sélectionner le statut"
      value={statutValue}
      onChange={(value) => setStatutValue(value) 
    }
    
          >
          <Option value="Enable">Enable</Option>
          <Option value="Disable">Disable</Option>
        </Select>
      </Form.Item>
      {/* Add other form fields for modification */}
    </Form>
  )}
</Modal>

    </div>
    </>
}

export default ManageUsers;
