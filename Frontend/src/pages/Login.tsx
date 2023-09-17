import React, { useState } from "react";
import { LoginUserDTO } from "../dtos/login.user.dto";
import Auth from "../services/auth.service";
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState<LoginUserDTO>({
    username : "",
    password : ""
  });

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState: any) =>  ({
      ...prevState,
      [e.target.name]: e.target.value,
    })
    )
    console.log(user)
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
    e.preventDefault()

    if (user?.username === "" || user?.password === "") {
      setErrorMessage("Error: debe ingresar todos los campos");
      setError(true);
      return;
    }
    try {
      await Auth.login(user);
      navigate('/profile');
    } catch (error) {
      if(error.statusCode == 404){
        setError(true);
        setErrorMessage(error.message);
      }
      else if(error.statusCode == 403) {
        setError(true);
        setErrorMessage("La contraseña es incorrecta")
      } 
      else {
        setError(true);
        setErrorMessage("Error al iniciar sesion");
      }
    }
  };

  return (
    <div style={{background: 'linear-gradient(to bottom, #7D3C98, #AED6F1)', height: '100vh', width: '100%', position: 'fixed'}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
        <div style={{ border: '1px solid #ccc', padding: '50px', borderRadius: '10px', backgroundColor: '#5B2C6F', width: '450px' }}>
          <form className="login-register-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="h1 mb-3" style={{ fontFamily: 'sans-serif', fontWeight: 'bold',color: 'white' }}>Login</h1>
            <div className="form-group">
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
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                style={{ marginBottom: '10px', width: '30vh', height: '5vh'  }}
              />
              {error && !user.password && <div className="errorMessage">Debe completar este campo</div>}
            </div>
            {error && errorMessage && <div className="errorMessage">{errorMessage}</div>}
            <button
              className="btn btn-outline-dark btn-lg m-2 btn-text-dark"
              type="submit"
              onClick={handleLogin}
              style={{
                backgroundColor: 'green',
                color: 'white',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'lightgreen'; // Cambia el color de fondo al pasar el mouse
                e.currentTarget.style.color = 'black'; // Cambia el color del texto al pasar el mouse
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'green'; // Restaura el color de fondo cuando el mouse sale
                e.currentTarget.style.color = 'white'; // Restaura el color del texto cuando el mouse sale
              }}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login

