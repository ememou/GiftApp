import React, { useState } from 'react'
import {Form, Col, Button} from "react-bootstrap"
import axios from 'axios'
import {toast} from 'react-toastify'
import { useHistory } from 'react-router-dom'

const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const handleSubmit = (e)=>{
    e.preventDefault();

    const body = JSON.stringify({email, password});

    axios.post(`/login`, body)
        .then(res=> {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('isAdmin', res.data.isAdmin);
          history.push("/home");
          window.location.reload();
        })
        .catch(err=>{
            toast.error(err.response.data.msg);
        });
  }

  return (
    <div className="d-flex justify-content-center vh-100 py-5" style={{
      textAlign :"center",
      backgroundImage: "url('/img/bgLayout.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }}>
      <Col md={6} className="py-5">
        <Form onSubmit={handleSubmit}>
          
          <Form.Label>
            <h1><b>Login</b>&nbsp;<i className="fas fa-user-check" style={{fontSize: "35px"}}/> </h1>
          </Form.Label>
          
          <Form.Group className="mb-3 py-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" autoComplete="on" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit"> Submit</Button>
        </Form>
      </Col>
    </div>
  )
}

export default Login