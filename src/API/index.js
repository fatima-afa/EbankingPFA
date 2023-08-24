//import axios from 'axios'
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