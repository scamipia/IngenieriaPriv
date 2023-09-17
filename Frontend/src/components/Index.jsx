import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Index = ({ token, setToken }) => {
    const [testMsg, setTestMsg] = useState(null);
    
    const logout = () => { 
        console.log("funca")
        setToken("")
        localStorage.removeItem("token"); }

    useEffect(() => {
        fetch("http://localhost:8081/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      }).then( res => { 
        if(!res || !res.ok || res.status > 400) { return }
        return res.json()
      }).then(json => {
        setTestMsg(json.name)
      })
      .catch(err => { return })
    }, [token])

    return (
        <Box height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Box>
            {testMsg ? (
              <Heading as="h1" size="lg">
                Hi {testMsg}! You're logged in.
              </Heading>
            ) : (
              <Heading as="h1" size="lg">Loading...</Heading>
            )}
          </Box>
          <Box mt={4}>
            <Button onClick={() => logout()}>Log Out</Button>
          </Box>
        </Box>
      );      
}

export default Index
