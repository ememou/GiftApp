import React, {useEffect, useState} from 'react'
import Sidebar from "../components/Sidebar"
import axios from "axios"
import Gift from "../components/Gift"
import {Col, Row, ListGroup, Button, Modal } from "react-bootstrap"
import {Link} from 'react-router-dom'

const Home = ({account: user}) => {
    const [homeData, setHomeData] = useState([])
    const [searchData, setSearchData] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        let isApiSubscribed = true;
        if(Object.keys(user).length !== 0){
            axios.get(`/home/gethomeDate/`)
                .then(res =>{
                    if (isApiSubscribed) {
                        setHomeData(res.data);
                        //console.log(res.data)
                    }
                }).catch(err=>{
                    console.log(err);
                })
        }
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, [user])
    
    const handleDate = () =>{
        axios.get(`/home/gethomeDate/`)
            .then(res =>{
                setHomeData(res.data);
                //console.log(res.data)
            }).catch(err=>{
                console.log(err);
            })
    }
    const handleAmount = () =>{
        axios.get(`/home/gethomeAmount/`)
            .then(res =>{
                setHomeData(res.data);
                //console.log(res.data)
            }).catch(err=>{
                console.log(err);
            })
    }
    /////////////////search
    const handleSearch = () =>{
        const data = searchData
        const body = JSON.stringify({data})
        axios.post(`/home/search/`, body)
            .then(res =>{
                setSearchResults(res.data);
                setShow(true);
            }).catch(err=>{
                console.log(err);
            })
    }
    
    return (
        <>
            {
                localStorage.getItem("isAdmin")==="false"&& 
                <>
                    <div>
                        <Sidebar user={user}/>
                    </div>
                    <main className="px-5">
                        <div className="input-group text-center my-1">
                            <input className="form-control" type="text" placeholder="Search for Users..." onChange={(e)=>{setSearchData(e.target.value)}}/>
                            <span role="button" className="btn btn-secondary mx-1" type="submit" onClick={handleSearch} ><i className="fas fa-search"></i></span >
                        </div><br/>
                        
                        <Modal show={show} onHide={handleClose} style={{top:"48px"}}>
                            <Modal.Header closeButton>
                                <Modal.Title>Search results!</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    {
                                        searchResults.length?
                                        searchResults.map(userSearch=>{
                                            return(
                                                <Col key={userSearch._id}>
                                                    <ListGroup variant="flush" className="bg-white shadow rounded overflow-hidden my-3">
                                                        <ListGroup.Item>
                                                            <Row>
                                                                <Col className="col-md-4 col-lg-4 col-sm-4">
                                                                    <Link  to={`/profile/${userSearch.username}`} >
                                                                        <img className='imgGoProf rounded-circle' src={`http://localhost:5000/image/${userSearch.profilePic}`} alt="" variant="top" />
                                                                    </Link>
                                                                </Col>
                                                                <Col className="col-md-4 col-lg-4 col-sm-4 text-center py-1">
                                                                    <Link  to={`/profile/${userSearch.username}`} style={{textDecoration: 'none'}}>
                                                                        <span className=''>{userSearch.username}</span>
                                                                    </Link>
                                                                </Col>
                                                                {
                                                                    userSearch.weAreFriends&&
                                                                    <Col className="col-md-4 col-lg-4 col-sm-4">
                                                                        <div className="input-group text-center dropstart" >
                                                                            <span  className="ms-auto d-inline-flex p-2"><i className="fas fa-user-check"/></span>
                                                                        </div>
                                                                    </Col>
                                                                }
                                                                {
                                                                    (userSearch._id!==user._id) && !userSearch.weAreFriends && 
                                                                    <Col className="col-md-4 col-lg-4 col-sm-4 " >
                                                                        <div className="input-group text-center dropstart" >
                                                                            <span  className="ms-auto d-inline-flex p-2"><i className="fas fa-user-slash"/></span>
                                                                        </div>
                                                                    </Col>
                                                                }
                                                            </Row>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Col>
                                            )
                                        }):
                                        <h1 className="text-center">No Results</h1>
                                    }
                                </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                            
                        <div className="input-group text-center " >
                            <h1 className="d-inline-flex" style={{color: "#40E0D0"}}>Think about your friends!</h1>
                            <span  className="ms-auto d-inline-flex p-2" role="button"  data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"/></span>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                
                                <li onClick={handleDate} ><span className="dropdown-item">By Date</span></li>
                                <li onClick={handleAmount}><span className="dropdown-item">By Total amount</span></li>
                            </ul>
                        </div>
                        <div >    
                            {
                                homeData.length?
                                    homeData.map(gift=>{
                                            return (
                                                <div key={gift._id} >
                                                    <Gift user={user} gift={gift} isMine={false} meDonator={gift.meDonator}/>
                                                </div>
                                            )
                                    }):
                                    (<h1 className="text-center lh-1">No Friends</h1>)  
                            }
                            
                        </div>
                    </main>
                    
                </>
            }
        </>
        
    )
}

export default Home
