import React ,{ useState, useEffect } from "react";
import UserService from "../services/user.services";
import RegisterVehicle from "./RegisterVehicle";
import UpdateVehicle from "./UpdateVehicle";

const Vehicles = () => {
 const [vehicles, setVehicles] = useState([]);
 const[mostrarNuevosVehiculos,setMostrarNuevosVehiculos] = useState(false); 
 const[vehicleUpdate,setVehicleUpdate] = useState(null);

  useEffect(() => {
    UserService.getAllVehicles().then(
      (response) => {
        console.log(response.data);
        setVehicles(response.data);
      },
      (error) => {
        const _vehicles =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          
          setVehicles(_vehicles);
      }
    );
  }, []);

  function deleteVehicle(id){

    UserService.DeleteVehiculo(id).then((response) =>{
      console.log(response);
      onVehicleDeleted(id);
    },
    (error) => {
      console.log(error);
      alert(error);
    });

  }



 
  return (
    <div className="container">
        <div className="row min-vh-50">
          <div className="col justify-content-left align-items-left">
          <button onClick={() => {setMostrarNuevosVehiculos(true)}} className="btn btn-success btn-sm w-30">Registrar Vehiculo</button>
          </div>
        </div>

        {(vehicles.length > 0 && mostrarNuevosVehiculos === false && vehicleUpdate === null)  && renderVehicles()}
        {mostrarNuevosVehiculos && <RegisterVehicle onVehicleCreated={onVehicleCreated} />}  
        {vehicleUpdate !== null && <UpdateVehicle vehicle={vehicleUpdate} onVehicleUpdated={onVehicleUpdated}/>}   
    </div>
  );

  function renderVehicles(){
    return(
          <div className="table-responsive mt-5">
              <table className="table table-bordered border-dark">
                  <thead>
                      <tr>    
                      <th scope="col">Id</th>
                      <th scope="col">Patente</th>
                      <th scope="col">Ano</th>
                      <th scope="col">Modelo</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Color</th>
                      <th scope="col">Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                          {vehicles.map((vehicle) => (
                              <tr key={vehicle.id}>
                              <th scope="row">{vehicle.id}</th>
                              <td>{vehicle.patente}</td>
                              <td>{vehicle.ano}</td>
                              <td>{vehicle.modelo}</td>
                              <td>{vehicle.marca}</td>
                              <td>{vehicle.color}</td>
                              <td>
                              <button onClick={() => setVehicleUpdate(vehicle)} type="button" className="btn btn-primary">Update</button>
                              <button onClick={() => { if(window.confirm(`¿Esta seguro de eliminar el registro "${vehicle.patente}"?`)) deleteVehicle(vehicle.id)}} type="button" className="btn btn-danger">Delete</button>
                        
                              </td>
                          </tr>
                          ))} 
                  </tbody>
  
              </table>
  
          </div>
  );
  }
  
  function onVehicleCreated(vehicleCreated){
    setMostrarNuevosVehiculos(false);
      if(vehicleCreated === null){
        return;
      }
    alert("Vehiculo registrado con exito");
    window.location.reload();
    }

  function onVehicleUpdated(vehicleUpdated){
    setVehicleUpdate(null);
    if(vehicleUpdated === null){
      return;
    }
    let vehiclesCopy = [...vehicles];

    const indexVehicle = vehiclesCopy.findIndex((vehiclesCopyVehicle,vehicleActual) => {
      if(vehiclesCopyVehicle.id === vehicleUpdated.id){
        return true;
      }else{
        return false;
      }
    });

    if(indexVehicle !== -1){
        vehiclesCopy[indexVehicle] = vehicleUpdated;
    }

    setVehicles(vehicleUpdate);
    alert("Vehiculo Actualizado realizada con exito");
    window.location.reload();
  }

  
  function onVehicleDeleted(id){
    let vehiclesCopy = [...vehicles];

    const indexVehicle = vehiclesCopy.findIndex((vehiclesCopyVehicle,vehicleActual) => {
      if(vehiclesCopyVehicle.id === id){
        return true;
      }else{
        return false;
      }
    });

    if(indexVehicle !== -1){
        vehiclesCopy.splice(indexVehicle,1);
    }

    setVehicles(vehiclesCopy);
    alert("¡Vehiculo eliminado con exito!");

  }
};
export default Vehicles;
