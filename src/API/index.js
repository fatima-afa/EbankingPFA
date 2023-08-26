import axios from 'axios'
import React, { useState, useEffect } from 'react';

export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};


export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};

//export const getAdmins =()=>{
  //return fetch("http://localhost:8888/user/admins").then((res) => res.json());
//};

export const getAdmins = () => {
  return axios.get('http://localhost:8888/user/admins')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getAllBOs=()=>{
  return axios.get('http://localhost:8888/user/bos')
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}
/*const createUser = (user) => {
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
*/

/*function AdminDetails({ adminId }) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Define the URL for your backend's getAdminById endpoint
    const apiUrl = `http://localhost:8888/user/admins/${adminId}`;

    // Make the GET request using Axios
    axios.get(apiUrl)
      .then(response => {
        // Handle the successful response
        setAdmin(response.data); // Assuming the response contains admin data
      })
      .catch(error => {
        // Handle errors (e.g., admin not found)
        console.error('Error fetching admin data:', error);
      });
  }, [adminId]);

  if (!admin) {
    return <div>Loading...</div>; // You can display a loading message while fetching data
  }

  return (
    <div>
      <h2>Admin Details</h2>
      <p>ID: {admin.id}</p>
      <p>Name: {admin.name}</p>
      {/* Add more admin details as needed */
  //  </div>
  //);
//}

//export default AdminDetails;
