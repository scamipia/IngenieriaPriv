import { RegisterUserDTO } from "../dtos/register.user.dto";
import { LoginUserDTO } from "../dtos/login.user.dto";
import API from './API';


const URL = "http://localhost:8080/auth/"

const login = async (body: LoginUserDTO) => {
  try {
  const response = await API.post(`${URL}login`, body);
    if (response.access_token) {
      saveToken(response.access_token);
    } else {
      throw new Error("Respuesta de inicio de sesión inesperada");
    }
  } catch (error) {
    throw error
  }
};

const register = async (body: RegisterUserDTO) => {
  try {
    const response = await API.post(`${URL}register`, body);
    if (response.access_token) {
      saveToken(response.access_token);
    } else {
      console.log(response.message)
      throw new Error("Respuesta de registro inesperada");
    }
  } catch (error) {
    throw new Error("Error al registrar: " + error);
  }
};

const saveToken = async (access_token: any) => {
  localStorage.setItem("authToken", access_token);
}


const Auth = {
    login,
    register
}

export default Auth
  


