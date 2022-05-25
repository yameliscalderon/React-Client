import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}/api/`;

// registro de usuario
const register = (rut,nombre,apellido,anoNacimiento,email, password) => {
    return axios.post(API_URL + "users", {
      rut,
      nombre,
      apellido,
      anoNacimiento,
      email,
      password,
    });
  };

  // se envia peticion post para obtener  JWT
  const login = (email, password) => {
    return axios
      .post(API_URL + "token", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setWithExpireTime("user",response.data,600000,email);
          // localStorage.setItem("user", JSON.stringify(response.data));
         }
        return response.data;
      });
  };

  //funcion para manejo de sesion /token
  function setWithExpireTime(key, value, ttl,name) {
    const now = new Date()
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
      name:name,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  //cerrar sesion remueve el obj user
  const logout = () => {
    localStorage.removeItem("user");
  };

  
  //obtener usuario actual
  const getCurrentUser = (key) => {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
      return item
    //return JSON.parse(localStorage.getItem("user"));
  };

 
  const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
  };
  export default AuthService;
  
  
  

  