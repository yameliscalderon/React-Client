import React,{useState} from 'react'
import { form } from 'react-validation/build/form';
import UserService from '../services/user.services'

export default function UpdateVehicle(props) {
  const initialFormData = Object.freeze({
    id:props.vehicle.id,
    patente:props.vehicle.patente, 
    ano: props.vehicle.ano,
    modelo:props.vehicle.modelo,
    marca:props.vehicle.marca,
    color:props.vehicle.color
  });
  const [formData,setFormData] = useState(initialFormData);

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo es requerido!
        </div>
      );
    }
  };

  const handleChange = (e) =>{
      setFormData({
          ...formData,
          [e.target.name]:e.target.value,
      });
  };

  const validPatente = (value) => {
    if (value.length < 6 || value.length > 6) {
      return (
        <div className="alert alert-danger" role="alert">
          el campo debe tener 6 caracteres.
        </div>
      );
    }
  };

  const validString = (value) => {
    if (value.length < 3 || value.length > 50) {
      return (
        <div className="alert alert-danger" role="alert">
           campo debe estar entre 6 y 40 caracteres.
        </div>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicleToUpdate = {
      id: props.vehicle.id,
      patente: formData.patente,
      ano: formData.ano,
      modelo:formData.modelo,
      marca: formData.marca,
      color:formData.color,
    };

  
    UserService.UpdateVehiculo(vehicleToUpdate).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        alert(error);
      });

      props.onVehicleUpdated(vehicleToUpdate);
  }

  return (
    <div>
        <form className='W-103 px5'>
          <h1 className='mt-5'> Actualizar Vehiculo {props.vehicle.patente}</h1>
          
           <div className='mt-5'>
              <label className='h3 form-label'> Patente</label>
              <input value={formData.patente} name="patente" type="text" className='form-control' onChange={handleChange} validations={[required, validPatente]}/>
           </div>

           <div className='mt-5'>
              <label className='h3 form-label'> A??o Vehiculo</label>
              <input value={formData.ano} name="ano" type="number" className='form-control' onChange={handleChange} validations={[required]}/>
           </div>

           <div className='mt-5'>
              <label className='h3 form-label'> Modelo</label>
              <input value={formData.modelo} name="modelo" type="text" className='form-control' onChange={handleChange} validations={[required, validString]}/>
           </div>

           
           <div className='mt-5'>
              <label className='h3 form-label'> Marca</label>
              <input value={formData.marca} name="marca" type="text" className='form-control' onChange={handleChange} validations={[required, validString]} />
           </div>

           
           <div className='mt-5'>
              <label className='h3 form-label'> Color</label>
              <input value={formData.color} name="color" type="text" className='form-control' onChange={handleChange} validations={[required, validString]}/>
           </div>

            <button onClick={handleSubmit} className="btn btn-primary btn-block mt-5"> Actualizar</button>
            <button onClick={()=> props.onVehicleUpdated(null)} className="btn btn-danger btn-block mt-3"> Cancelar</button>
        </form>      
    </div>
  )
}
