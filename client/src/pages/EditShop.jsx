import React, { useState } from 'react'
import axios from 'axios';
import {Container, Image, Form, Button} from "react-bootstrap"
import {toast} from 'react-toastify'
import { useHistory } from 'react-router'

const EditProfile = ({account: shop}) => {
    //image Upload
    const [file, setFile] = useState(null);
    const [inputContainsFile, setInputContainsFile] = useState(false);
    const [currentlyUploading, setCurrentlyUploading] = useState(false);
    const [progress, setProgress] = useState(null);
    const [imageId, setImageId] = useState(null);

    //edit profile
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

    const fileUploadHandler = () =>{
        const fd = new FormData();
        fd.append('imageShop', file, file.name);
        axios.post("/imageShop/upload/", fd, {
            onUploadProgress: (progressEvent)=>{
                setProgress((progressEvent.loaded/progressEvent.total)*100);
                console.log('upload progress: ', Math.round(progress))
            }
        }).then(({data}) =>{
            setImageId(data);
            setFile(null);
            setInputContainsFile(false);
            setCurrentlyUploading(false);
        }).catch(err=>{
            console.log(err);
            if(err.response.status === 400){
                if(err.response.data.msg) toast.error(err.response.data.msg);
                else{
                    console.log("other error");
                    setInputContainsFile(false);
                    setCurrentlyUploading(false)
                }
            }
        })
    }

    const handleClick = () =>{
        if(inputContainsFile){
            setCurrentlyUploading(true);
            fileUploadHandler();
        }
    }

    const handleFile = (e) =>{
        setFile(e.target.files[0]);
        setInputContainsFile(true);
    }

    const history = useHistory();
    const handleSubmit = e=>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Password and confirm password doesn't match!");
            return;
        }
        const body = JSON.stringify({brand, email, phone, fax, edra, afm, doy, gemh, password});
        //console.log(birthDate);
        axios.post(`/shop/edit`, body)
            .then(res=> {
                console.log(res.data);
                history.push(`/shop/edit`);
            })
            .catch(err=>{
                toast.error(err.response.data.msg);
            });
    }

    return (
        <>
            {
                localStorage.getItem("isAdmin")==="true"&& 
                <Container>
                    <div className=" py-3">
                        <figure>
                            <blockquote className="blockquote">
                                <legend>{shop.brand}</legend>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                <cite title="Source Title">{shop.email}</cite>
                            </figcaption>
                        </figure>
                    </div>
                    
                    <fieldset>
                    {/*///////////////////////Upload Image */}
                        {
                            currentlyUploading ? (
                                <Image thumbnail style={{maxWidth: '10rem', maxHeight: '10rem'}} src="img/loading_dots.gif" variant="top" />
                            ):(
                                <div className="form-group row">
                                    <div className="col-sm-3">
                                        {   
                                            imageId ?
                                            (
                                                <Image thumbnail style={{maxWidth: '10rem', maxHeight: '10rem'}} src={`http://localhost:5000/imageShop/${imageId}`} alt="profile pic" variant="top" />
                                            ):
                                            (
                                                /*<Link to={`http://localhost:5000/image/${imageId}`} target="_blank" className="navbar-brand" >*/
                                                    <Image thumbnail style={{maxWidth: '10rem', maxHeight: '10rem'}} src={`http://localhost:5000/imageShop/${shop.shopPic}`} alt="profile pic" variant="top" />
                                                /*</Link>*/
                                            )                    
                                        }
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="form-group row">
                                            <label className="form-label mt-4">Change your Shop image</label>
                                        </div>
                                        <div className="form-group row">
                                            <input className="form-control" type="file" onChange={handleFile} id="file" name="file"/>
                                            <label htmlFor="file" onClick={handleClick}>{file? <>Submit</>:<></> }</label>
                                        </div>
                                    </div>
                                </div>
                            )
                        }            
                    </fieldset>
                        {/*///////////////////////Edit Profile */}
                    <Form onSubmit={handleSubmit} >
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
                        <div className="py-5">
                            <Button style={{textAlign: 'center', margin: 'auto' , display: 'flex'}} variant="primary" type="submit"> Submit</Button>
                        </div>
                    </Form>
                    <br />   
                </Container>
            }
        </>
        
    )
}

export default EditProfile
