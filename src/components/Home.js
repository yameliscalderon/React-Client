import React,{useState, useEffect }from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.services";
const Home = () => {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
      const user = AuthService.getCurrentUser("user");
      if (user) {
        setCurrentUser(user);

      }
    }, []);
      


  return (
    <div className="container">
        <div className="row min-vh-100">
            <div className="col d-flex flex-column justify-content-center align-items-center" style={{backgroundColor: "lightBlue"}}> 
                <div>
                    <h1>MENÚ</h1>
                </div>
                 <div className="mt-5" >
                     <button onClick={() => {navigate("/user");}} className="btn btn-dark btn-lg w-100">Listar Usuarios</button>
                     {currentUser ? (
                        <button id="btnlistVh" onClick={() => {navigate("/vehicles");}} className="btn btn-dark btn-lg w-100 mt-4">Listar Vehiculos</button>
                      ) : 
                      ( 
                      <div>
                        <button id="btnlogin" onClick={() => {navigate("/login");}} className="btn btn-dark btn-lg w-100 mt-4">Inciar Sesión</button>
                     </div>
                      )}
                 </div>   
            </div>

        </div>
       
    </div>
  );


};
export default Home;
