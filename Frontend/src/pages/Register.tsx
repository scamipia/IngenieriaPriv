import React, { SyntheticEvent, useState } from 'react';
import { RegisterUserDTO } from '../dtos/register.user.dto';
import Auth from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { isValidPassword } from '../utilities/passwordValidation';
import { isValidEmail } from '../utilities/emailValidation';

export const Register = () => {

  const navigate = useNavigate(); 

  const [user, setUser] = useState<RegisterUserDTO>({
    firstName: "",
    lastname: "",
    username : "",
    email: "",
    password : "",
  });

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState: RegisterUserDTO) =>  ({
      ...prevState,
      [e.target.name]: e.target.value,
    })
    )
    console.log(user)
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user.username === "" || user.email === "" || user.password === "") {
      setErrorMessage("Debe completar todos los campos");
      setError(true);
      return;
    }
    if(!isValidEmail(user.email)) {
      setError(true);
      setErrorMessage("Email invalido");
      return;
    }
    if(!isValidPassword(user.password)) {
      setError(true);
      setErrorMessage("La contraseña debe tener 8 caracteres, incluir caraceres especiales,minusculas y mayusculas");
    return;
    }
    try {
      await Auth.register(user);
      navigate('/registroExitoso'); 
    } catch (error) {
      setErrorMessage("Error al registrar");
      setError(true);
    }
  };

 return (
  <div className="bg-gradient-to-b from-violet-900  to-blue-300 h-screen w-screen fixed flex flex-col items-center justify-center">
    <div className="border border-gray-300 p-8 rounded-lg bg-violet-700 w-96 ">
      <form className="login-register-page flex flex-col items-center">
        <h1 className="text-3xl mb-3 font-bold text-white">Register</h1>
        <div className="form-group">
          <label className="text-white">First name</label>
          <input
            type="text"
            name="firstName"
            className="form-control mb-4 w-80 h-10"
            placeholder="First name (Opcional)"
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label style={{ color: 'white' }}>Lastname</label>
          <input
              type="text"
              name="lastname"
              className="form-control mb-4 w-80 h-10"
              placeholder="Lastname (Opcional)"
              onChange={handleChange}
            />
        </div>
        <div className='form-group'>
          <label style={{ color: 'white' }}>
            Username  
            <span style={{ color: 'red' }}> *</span>
          </label>
          <input
            type="text"
            name="username"
            className="form-control mb-4 w-80 h-10"
            placeholder="Username"
            onChange={handleChange}
          />
          {error && !user.username && <div className="errorMessage">Debe completar este campo</div>}
        </div>
        <div className='form-group'>
          <label style={{ color: 'white' }}>
            Email address
            <span style={{ color: 'red' }}> *</span>
          </label>
          <input
            type="text"
            name="email"
            className="form-control mb-4 w-80 h-10"
            placeholder="example@email.com"
            onChange={handleChange}
          />
          {error && !user.email && <div className='errorMessage'>Debe completar este campo</div>}
          {error && user.email && !isValidEmail(user.email) && <div className='errorMessage'>Email invalido</div> }
        </div>
        <div className='form-group'>
          <label style={{ color: 'white' }}>
            Password
            <span style={{ color: 'red' }}> *</span>
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            style={{ marginBottom: '10px', width: '30vh', height: '5vh'  }}
          />
          {error && !user.password && <div className='errorMessage'>Debe completar este campo</div>}
          {error && user.password && !isValidPassword(user.password) && <div className='errorMessage'>La contraseña debe tener 8 caracteres, incluir caracteres especiales, minúsculas y mayúsculas</div> }
        </div>
        
          <button
            className="btn btn-primary w-10 py-2"
            type="submit"
            onClick={handleRegister}
            style={{
              backgroundColor: 'green', 
              color: 'white',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'lightgreen';
              e.currentTarget.style.color = 'black'; 
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'green'; 
              e.currentTarget.style.color = 'white';
            }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};


export default Register