import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import {Form, Col, Button, Row} from "react-bootstrap"
import { useHistory } from 'react-router-dom'

const RegisterAdmin = () => {
    const [brand, setBrand] =  useState("");
    const [email, setEmail] =  useState("");
    const [phone, setPhone] =  useState("");
    const [fax, setFax] =  useState("");
    const [edra, setEdra] =  useState("");
    const [afm, setAfm] =  useState("");
    const [doy, setDoy] =  useState("");
    const [gemh, setGemh] =  useState("");
    const [password, setPassword] =  useState("");
    const [confirmPassword, setConfirmPassword] =  useState("");

    const history = useHistory();
    const handleSubmit = e=>{
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Password and confirm password doesn't match!");
            return;
        }
        const body = JSON.stringify({brand, email, phone, fax, edra, afm, doy, gemh, password});
        
        axios.post(`/registerAdmin`, body)
            .then(res=> {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('isAdmin', res.data.isAdmin);
                history.push("/homeadmin");
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
            <Col md={10}>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>
                        <h1>
                            <b>Register as Partner</b>&nbsp;
                            <i className="fas fa-store-alt" style={{fontSize: "35px"}}></i>
                            <i className="fas fa-plus" style={{fontSize: "20px"}}></i>
                        </h1>
                    </Form.Label>
                    <Row>
                         <Col md={6}>
                            <Form.Group>
                                <Form.Label>Επωνυμία</Form.Label>
                                <Form.Control type="text" placeholder="Επωμυμία" onChange={e=>setBrand(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Τηλέφωνο</Form.Label>
                                <Form.Control type="tel" placeholder="Τηλέφωνο" onChange={e=>setPhone(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Fax</Form.Label>
                                <Form.Control type="tel" placeholder="Fax" onChange={e=>setFax(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Έδρα</Form.Label>
                                <Form.Control type="text" placeholder="Έδρα" onChange={e=>setEdra(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Α.Φ.Μ.</Form.Label>
                                <Form.Control type="Number" maxLength="10" placeholder="Α.Φ.Μ." onChange={e=>setAfm(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Δ.Ο.Υ.</Form.Label>
                                <Form.Control type="text" placeholder="Δ.Ο.Υ." onChange={e=>setDoy(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Αριθμός Γ.Ε.ΜΗ.</Form.Label>
                                <Form.Control type="Number"  placeholder="Αριθμός Γ.Ε.ΜΗ." onChange={e=>setGemh(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Κωδικός</Form.Label>
                                <Form.Control type="password" autoComplete="on" placeholder="Κωδικός" onChange={e=>setPassword(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Επιβεβαίωση Κωδικού</Form.Label>
                                <Form.Control type="password" autoComplete="on" placeholder="Επιβεβαίωση Κωδικού" onChange={e=>setConfirmPassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row >

                    {/*<Form.Label className="py-4">
                        <h2>Τρόποι πληρωμής</h2>
                    </Form.Label>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control />
                    </Form.Group>*/}
                    <div className="py-5">
                        <Button style={{textAlign: 'center', margin: 'auto' , display: 'flex'}} variant="primary" type="submit"> Submit</Button>
                    </div>
                    
                </Form>
            </Col>
        </div>
    );
}

export default RegisterAdmin;