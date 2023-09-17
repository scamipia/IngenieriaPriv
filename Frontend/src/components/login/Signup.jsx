import React, { useContext } from 'react';
import { VStack, ButtonGroup, Button, Heading } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import TextField from './TextField';
import { useNavigate } from 'react-router-dom';
import Database from '../../Mocking';

const Signup = ({ setToken }) => {

  const navigate = useNavigate()
  const { database , setDatabase} = useContext(Database)

  return (
    <Formik
    initialValues= {{username: "", password: "", email: "", mobile: ""}}
    validationSchema= { Yup.object({
      username: Yup.string().required("Username required"),
      password: Yup.string()
        .required("Password required")
        .min(6, "Password too short"),
      email: Yup.string().required("Email required")
        .email("Invalid email"),
      mobile: Yup.number().typeError("Must be a number")
        .required("Mobile number is required")
        .integer("Invalid mobile number").positive("Invalid mobile number")
        .min(1000000000, "Invalid mobile number")
        .max(10000000000, "Invalid mobile number")
    })}
    onSubmit= {(values, actions) => {
      const vals = { ...values }
      console.log(vals)
      actions.resetForm()
      fetch("http://localhost:8081/login/signup", {
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
        console.error(err);
        setDatabase(database.set(vals.username, vals.password));
      })
    }}>
      <VStack 
      as={Form}
      w={{base: "90%", md: "500px"}}
      m="auto"
      justify="center"
      h="100vh">

        <Heading> Sign Up </Heading>
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
        <TextField
          label="Email" 
          name="email"
          placeholder="Enter email"
          autocomplete="off"
        />
        <TextField
          label="Mobile" 
          name="mobile"
          placeholder="Enter mobile number"
          autocomplete="off"
        />

        <ButtonGroup>
          <Button colorScheme="teal" type="submit">Create Account</Button>
          <Button onClick={ () => navigate('/') }>Back</Button>
        </ButtonGroup>

      </VStack>
    </Formik>
  );
};

export default Signup;