import AuthService from "./auth.services";
//encabezado para hacer peticiones
export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('user'));
    if(token===null){
      AuthService.logout();
      window.location.href="http://localhost:8081/login"
      return{};
    }

    if (token.value) {
      return { Authorization: 'Bearer ' + token.value};
    } else {
      return {};
    }
  }
  