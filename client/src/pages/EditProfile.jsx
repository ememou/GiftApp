import React, { useState } from 'react'
import axios from 'axios';
import {Container, Image, Form} from "react-bootstrap"
import {toast} from 'react-toastify'
import { useHistory } from 'react-router'

const EditProfile = ({account: user}) => {
    //image Upload
    const [file, setFile] = useState(null);
    const [inputContainsFile, setInputContainsFile] = useState(false);
    const [currentlyUploading, setCurrentlyUploading] = useState(false);
    const [progress, setProgress] = useState(null);
    const [imageId, setImageId] = useState(null);

    //edit profile
    const [username, setUsername] = useState(user?.username);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState(user?.gender);
    const [birthDate, setBirthDate] = useState(user?.birthDate);
    const [bio, setBio] = useState(user?.bio);
    const [fName, setFName] = useState(user?.fName);
    const [lName, setLName] = useState(user?.lName);
    const [city, setCity] = useState(user?.city);
    const [country, setCountry] = useState(user?.country);
    const [postalCode, setPostalCode] = useState(user?.postalCode);
    const [address, setAddress] = useState(user?.address);
    const [ringbell, setRingbell] = useState(user?.ringbell);
    const [floor, setFloor] = useState(user?.floor);
    const [phone, setPhone] = useState(user?.phone);

    const fileUploadHandler = () =>{
        const fd = new FormData();
        fd.append('image', file, file.name);
        axios.post("/image/upload", fd, {
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
        const body = JSON.stringify({username, password, gender, birthDate, bio, fName, lName, city, country, postalCode, address, ringbell, floor, phone});
        //console.log(birthDate);
        axios.post(`/user/edit`, body)
            .then(res=> {
                console.log(res.data);
                history.push(`/profile/${username}/edit`);
            })
            .catch(err=>{
                toast.error(err.response.data.msg);
            });
    }

    return (
        <>
            {
                localStorage.getItem("isAdmin")==="false"&& 
                <Container>
                    <div className=" py-3">
                        <figure>
                            <blockquote className="blockquote">
                                <legend>{user.username}</legend>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                <cite title="Source Title">{user.email}</cite>
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
                                                <Image thumbnail style={{maxWidth: '10rem', maxHeight: '10rem'}} src={`http://localhost:5000/image/${imageId}`} alt="profile pic" variant="top" />
                                            ):
                                            (
                                                /*<Link to={`http://localhost:5000/image/${imageId}`} target="_blank" className="navbar-brand" >*/
                                                    <Image thumbnail style={{maxWidth: '10rem', maxHeight: '10rem'}} src={`http://localhost:5000/image/${user.profilePic}`} alt="profile pic" variant="top" />
                                                /*</Link>*/
                                            )                    
                                        }
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="form-group row">
                                            <label className="form-label mt-4">Change your profile image</label>
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
                        <div className="form-group">
                            <label className="form-label mt-4">Username</label>
                            <input type="text" className="form-control" placeholder={username} onChange={e=>setUsername(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label mt-4">Password</label>
                            <input type="password" autoComplete="on" className="form-control" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label mt-4"> Confirm Password</label>
                            <input type="password" autoComplete="on" className="form-control" placeholder="Confirm Password" onChange={e=>setConfirmPassword(e.target.value)}/>
                            <small className="form-text text-muted">We'll never share your password with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label className="form-label mt-4">Sex/Gender</label>
                            <select type="text" className="form-select" placeholder={gender} onChange={e=>setGender(e.target.value)}>
                                <option>Other</option>
                                <option>Female</option>
                                <option>Male</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label mt-4">Your Birthdate</label>
                            {
                                birthDate?
                                <input type="date" className="form-control" max="2004-01-01" placeholder={birthDate} onChange={e=>setBirthDate(e.target.value)}/>:
                                <input type="date" className="form-control" max="2004-01-01" onChange={e=>setBirthDate(e.target.value)}/>
                            }
                        </div>

                        <div className="form-group">
                            <label className="form-label mt-4">Bio</label>
                            {
                                bio?
                                <textarea type="text" className="form-control" rows="2" maxLength="250" placeholder={bio} onChange={e=>setBio(e.target.value)}></textarea>:
                                <textarea type="text" className="form-control" rows="2" maxLength="250" onChange={e=>setBio(e.target.value)}></textarea>
                            }
                            <small className="form-text text-muted">Max: 250 characters!!</small>
                        </div>

                        <fieldset>
                            <legend className="mt-4 py-3 px-5">Shipping Data</legend>
                                        
                            <div className="form-group">
                                <label className="form-label mt-4">First Name</label>
                                {
                                    fName?
                                    <input type="text" className="form-control" placeholder={fName} onChange={e=>setFName(e.target.value)}/>:
                                    <input type="text" className="form-control" onChange={e=>setFName(e.target.value)}/>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label mt-4">Last Name</label>
                                {
                                    lName?
                                    <input type="text" className="form-control" placeholder={lName} onChange={e=>setLName(e.target.value)}/>:
                                    <input type="text" className="form-control" onChange={e=>setLName(e.target.value)}/>
                                }
                            </div>
                                        
                            <div className="form-group">
                                <label className="form-label mt-4">Country</label>
                                {
                                    country?
                                    <input type="text" className="form-control" placeholder={country} onChange={e=>setCountry(e.target.value)}/>:
                                    <input type="text" className="form-control" onChange={e=>setCountry(e.target.value)}/>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label mt-4">City</label>
                                {
                                    city?
                                    <input type="text" className="form-control" placeholder={city} onChange={e=>setCity(e.target.value)}/>:
                                    <input type="text" className="form-control" onChange={e=>setCity(e.target.value)}/>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label mt-4">Postal Code </label>
                                {
                                    postalCode!==""?
                                    <input type="Number" className="form-control" placeholder={postalCode} onChange={e=>setPostalCode(e.target.value)}/>:
                                    <input type="Number" className="form-control" onChange={e=>setPostalCode(e.target.value)}/>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label mt-4">Address</label>
                                {
                                    address?
                                    <input type="text" className="form-control" placeholder={address} onChange={e=>setAddress(e.target.value)}/>:
                                    <input type="text" className="form-control" onChange={e=>setAddress(e.target.value)}/>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label mt-4">Floor</label>
                                {
                                    floor!==null?
                                    <input type="Number" className="form-control" placeholder={floor} onChange={e=>setFloor(e.target.value)}/>:
                                    <input type="Number" className="form-control" onChange={e=>setFloor(e.target.value)}/>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label mt-4">Ringbell</label>
                                {
                                    ringbell?
                                    <input type="text" className="form-control" placeholder={ringbell} onChange={e=>setRingbell(e.target.value)}/>:
                                    <input type="text" className="form-control" onChange={e=>setRingbell(e.target.value)}/>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label mt-4">Phone </label>
                                {
                                    phone!==null?
                                    <input type="tel" className="form-control" placeholder={phone} onChange={e=>setPhone(e.target.value)}/>:
                                    <input type="tel" className="form-control" onChange={e=>setPhone(e.target.value)}/>
                                }
                                
                            </div>
                        </fieldset>
                        <br /><br />
                        <button style={{textAlign: 'center', margin: 'auto' , display: 'flex'}} type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                    <br />   
                </Container>
            }
        </>
        
    )
}

export default EditProfile
