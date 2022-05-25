import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.services";

const API_URL = `${process.env.REACT_APP_API_URL}/api/`;

console.log(API_URL);
//validar token JWT esta activo
function validarToken(){
  //se valida el token
  let header = authHeader();
  if (header==='' || header===null){
    alert("Su sesión expiro");
    AuthService.logout();
    window.location.href = "http://localhost:8081/login";
    return false;
  }else{
    return true;
  }

}

//la api users es publica no tiene JWT
const getAllUsers = () => {
    return axios.get(API_URL + "users");
  };

//la api vehicles requiere JWT 

//obtener todos los vehiculos
 const getAllVehicles = () => {
   // si el token es valido se ejecuta el llamado sino en el validar se deslogueo al usuario.
    if(validarToken){
      return axios.get(API_URL + "vehicles", { headers: authHeader() });
    }else{
      return;
    }
    
  };

//agregar un nuevo vehiculo
const AddVehiculo = (vehicle) => {

  let patente = vehicle.patente
  let ano = vehicle.ano
  let modelo = vehicle.modelo
  let marca = vehicle.marca
  let color = vehicle.color

  patente.replace(" ","");
  
  //se valida el token
  if(validarToken){
    return axios.post(API_URL + "vehicles",
   {patente,ano,modelo,marca,color},
   { headers: authHeader() });
  }else{
    return;
  }
  };

//actualizar un vehiculo
const UpdateVehiculo = (vehicle) => {
  let id = vehicle.id
  let patente = vehicle.patente
  let ano = vehicle.ano
  let modelo = vehicle.modelo
  let marca = vehicle.marca
  let color = vehicle.color

  patente.replace(" ","");
  if(validarToken){
    return axios.put(API_URL + "vehicles/"+ id,
   {id,patente,ano,modelo,marca,color},
   { headers: authHeader() });
  }else{
    return;
  }
  
};

const DeleteVehiculo = (id) => {
  if(validarToken){
   return axios.delete(API_URL + "vehicles/"+ id,
   { headers: authHeader()});
  }else{
    return;
  }
};


const UserService = {
   getAllUsers,
   getAllVehicles,
   AddVehiculo,
   UpdateVehiculo,
   DeleteVehiculo
  };
  export default UserService;
