import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.services";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo es requerido!
        </div>
      );
    }
  };

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Email No valido.
        </div>
      );
    }
  };

  const validUsername = (value) => {
    if (value.length < 3 || value.length > 50) {
      return (
        <div className="alert alert-danger" role="alert">
          el campo debe estar entre 3 y 50 caracteres.
        </div>
      );
    }
  };

  const validPassword = (value) => {
    if (value.length < 6 || value.length > 50) {
      return (
        <div className="alert alert-danger" role="alert">
           password debe estar entre 6 y 40 caracteres.
        </div>
      );
    }
  };

  const validRut= (value) => {
    if (value.length < 9 || value.length > 15) {
      return (
        <div className="alert alert-danger" role="alert">
           el campo debe estar entre 6 y 15 caracteres.
        </div>
      );
    }
  };
  
  const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const[rut,setRut] = useState("");
    const [username, setUsername] = useState("");
    const [lastname,setLastname] = useState("");
    const [anoNac,setAnonac] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const onChangeRut = (e) => {
        const rut = e.target.value;
        setRut(rut);
      };
    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
    const onChangeLastname = (e) => {
        const lastname = e.target.value;
        setLastname(lastname);
      };
    const onChangeAnonac= (e) => {
        const anonac = e.target.value;
        setAnonac(anonac);
      };
    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
    const handleRegister = (e) => {
      e.preventDefault();
      setMessage("");
      setSuccessful(false);
      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.register(rut,username,lastname,anoNac, email, password).then(
          (response) => {
            console.log(response);
            setMessage("¡Resigtrado don Éxito!");
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      }
    };
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="rut">Rut</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="rut"
                    value={rut}
                    onChange={onChangeRut}
                    validations={[required, validRut]}
                  />
                </div>  
                <div className="form-group">
                  <label htmlFor="username">Nombre</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, validUsername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Apellido</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={lastname}
                    onChange={onChangeLastname}
                    validations={[required, validUsername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="anoNac">Año Nacimiento</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="anoNac"
                    value={anoNac}
                    onChange={onChangeAnonac}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, validPassword]}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Registrar Usuario</button>
                </div>
              </div>
            )}
            {message && (
              <div className="form-group">
                <div
                  className={ successful ? "alert alert-success" : "alert alert-danger" }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    );
  };
  export default Register;