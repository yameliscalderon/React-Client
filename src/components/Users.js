import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserService from "../services/user.services";

const Users = () =>{
    let navigate = useNavigate();
    const [content, setContent] = useState([]);
  useEffect(() => {
    UserService.getAllUsers().then(
      (response) => {
        console.log(response.data);
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  
  return (
    <div className="container">     
        {renderUser()}
    </div>
  );

  function renderUser(){
    return(
          <div className="table-responsive mt-5">
              <table className="table table-bordered border-dark">
                  <thead>
                      <tr>    
                      <th scope="col">Id</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">AnoNacimiento</th>
                      <th scope="col">Email</th>
                      <th scope="col">Password</th>
                      </tr>
                  </thead>
                  <tbody>
                          {content.map((userCont) => (
                              <tr key={userCont.id}>
                              <th scope="row">{userCont.id}</th>
                              <td>{userCont.nombre}</td>
                              <td>{userCont.apellido}</td>
                              <td>{userCont.anoNacimiento}</td>
                              <td>{userCont.email}</td>
                              <td>{userCont.password}</td>
                          </tr>
                          ))} 
                  </tbody>
  
              </table>

              <div className="mt-5" >
                     <button onClick={() => {navigate("/register");}} className="btn btn-dark btn-lg w-100">Registrar Usuario</button>   
                 </div>  
  
          </div>
  );
  }
  
}
export default Users;  