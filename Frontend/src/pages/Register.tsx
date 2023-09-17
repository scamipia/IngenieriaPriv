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
    <div style={{background: 'linear-gradient(to bottom, #7D3C98, #AED6F1)', height: '100vh', width: '100%', position: 'fixed'}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
        <div style={{ border: '1px solid #ccc', padding: '50px', borderRadius: '10px', backgroundColor: '#5B2C6F ', width: '450px' }}>
          <form className="login-register-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="h1 mb-3" style={{ fontFamily: 'sans-serif', fontWeight: 'bold',color: 'white' }}>Register</h1>
            <div className='form-group'>
              <label style={{ color: 'white' }}>First name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First name (Opcional)"
                onChange={handleChange}
                style={{ marginBottom: '10px', width: '30vh', height: '5vh'  }}
              />
            </div>
            <div className='form-group'>
            <label style={{ color: 'white' }}>Lastname</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                placeholder="Lastname (Opcional)"
                onChange={handleChange}
                style={{ marginBottom: '10px', width: '30vh', height: '5vh'  }}
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
                className="form-control"
                placeholder="Username"
                onChange={handleChange}
                style={{ marginBottom: '10px', width: '30vh', height: '5vh'  }}
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
                className="form-control"
                placeholder="example@email.com"
                onChange={handleChange}
                style={{ marginBottom: '10px', width: '30vh', height: '5vh'  }}
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
    </div>
    );
  };
  

export default Register