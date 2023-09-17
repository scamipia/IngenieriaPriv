import React from 'react';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import SuccessfulRegistration from './pages/SuccessfulRegistration';
import SuccessfulLogin from './pages/SuccessfulLogin';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Nav/>
          <main className="form w-100 m-auto">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/profile" element={<UserProfile/>}/>
              <Route path="/registroExitoso" element={<SuccessfulRegistration/>}/>
              <Route path="/loginExitoso" element={<SuccessfulLogin/>}/>
            </Routes>
          </main>
        </BrowserRouter>
      </div>
  );
}

export default App;
