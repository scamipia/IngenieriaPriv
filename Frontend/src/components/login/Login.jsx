import { VStack, ButtonGroup, Button, Heading } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import TextField from './TextField';
import Database from '../../Mocking';

const Login = ({setToken}) => {

  const navigate = useNavigate()
  const { database } = useContext(Database)

  return (
    <Formik
    initialValues= {{username: "", password: ""}}
    validationSchema= { Yup.object({
      username: Yup.string().required("Username required"),
      password: Yup.string()
        .required("Password required")
        .min(6, "Password too short"),
    })}
    onSubmit= {(values, actions) => {
      const vals = { ...values }
      actions.resetForm()
      fetch("http://localhost:8081/login/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vals),
      })
      .catch( err => {
        return
      })
      .then( res => {
        if (!res || !res.ok || res.status > 400){
          return
        }
        return res.json()
      })
      .then(json => {
        setToken(json.token);
        window.localStorage.setItem('token', json.token);
      })
      .catch(err => {
        console.error("hola");
        console.log(database);
        let password = database.get(vals.username);
        if (password ? password == vals.password : false) {
          setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
        }

      })
      
    }}>
      <VStack 
      as={Form}
      w={{base: "90%", md: "500px"}}
      m="auto"
      justify="center"
      h="100vh">

        <Heading> Log In </Heading>
        <TextField 
          label="Username"
          name="username"
          placeholder="Enter username"
          autocomplete="off"
        />
        <TextField
          label="Password" 
          name="password"
          placeholder="Enter password"
          autocomplete="off"
          type="password"
        />

        <ButtonGroup>
          <Button colorScheme="teal" type="submit">Log In</Button>
          <Button onClick={ () => navigate('/register') }>Create Account</Button>
        </ButtonGroup>

      </VStack>
    </Formik>
  );
};

export default Login;