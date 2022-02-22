import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Row, Col, ListGroup, Button, Modal } from 'react-bootstrap'

const MyGift = () => {
    /* Modal */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalInfo, setModalInfo] = useState([]);
    /*friend */
    const [myGifts, setMyGifts] = useState([])
    
    useEffect(() => {
        let isApiSubscribed = true;
        
        axios.get(`/order/getOwnerData/`)
            .then(res =>{
                if (isApiSubscribed) {
                    setMyGifts(res.data);
                    console.log(res.data);
                }
            }).catch(err=>{
                console.log(err);
            })
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, [])

    return (
        <div>
            {
                myGifts.length?
                <>
                    <h1 className=" text-center lh-1">My Completed Gifts</h1>
                    {
                        myGifts.map((gift)=>{
                            return (
                                <div  className="m-3 list-group" key={gift.orderId}>
                                    <div className="list-group-item align-y-center">
                                        <div className='row'>
                                            <h4> {gift.createdAt}</h4>
                                        </div>
                                    </div>
                                    <div className="list-group-item">
                                        <div className='row'>
                                            <div className="col">
                                                <div className='list-inline d-flex justify-content-around'>
                                                    <div className='list-inline-item'>
                                                        <img className='img-thumbnail' src={gift.imageLink} style={{maxWidth: '10rem', maxHeight: '10rem'}} alt="" variant="top" />
                                                    </div>
                                                    <div className='list-inline-item py-lg-5 py-md-5'>
                                                        <strong>{gift.productName}</strong>
                                                    </div>
                                                    <div className='list-inline-item py-lg-5 py-md-5'>
                                                        <span>{parseFloat(gift.price + gift.shippingCost).toFixed(2)} €</span>
                                                    </div>
                                                    <div className='list-inline-item py-lg-5 py-md-5' onClick={handleShow}>
                                                        <span role="button" className="btn btn-primary mx-1" type="submit" onClick={()=>setModalInfo(gift.donators)} >
                                                            <i className="fas fa-users"></i>
                                                        </span >
                                                    </div>
                                                    <Modal show={show} onHide={handleClose} style={{top:"48px"}}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Your friends who helped you!!!</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            {
                                                                modalInfo.map((friend)=>{
                                                                    return(
                                                                        <Col key={friend.userId}>
                                                                            <ListGroup variant="flush" className="bg-white shadow rounded overflow-hidden my-3">
                                                                                <ListGroup.Item>
                                                                                    <Row>
                                                                                        <Col className="col-md-4 col-lg-4 col-sm-4">
                                                                                            {
                                                                                                friend.exist?
                                                                                                <Link  to={`/profile/${friend.username}`} >
                                                                                                    <img className='imgGoProf rounded-circle' src={`http://localhost:5000/image/${friend.img}`} alt="" variant="top" />
                                                                                                </Link>:
                                                                                                <img className='imgGoProf rounded-circle' src={`http://localhost:5000/image/${friend.img}`} alt="" variant="top" />
                                                                                            }
                                                                                        </Col>
                                                                                        <Col className="col-md-4 col-lg-4 col-sm-4 text-center py-1">
                                                                                            {
                                                                                                friend.exist?
                                                                                                <Link  to={`/profile/${friend.username}`} style={{textDecoration: 'none'}}>
                                                                                                    <span className=''>{friend.username}</span>
                                                                                                </Link>:
                                                                                                <span className=''>{friend.username}</span>
                                                                                            }
                                                                                        </Col>
                                                                                        {
                                                                                            friend.weAreFriends?
                                                                                            <Col className="col-md-4 col-lg-4 col-sm-4">
                                                                                                <div className="input-group text-center dropstart" >
                                                                                                    <span  className="ms-auto d-inline-flex p-2"><i className="fas fa-user-check"/></span>
                                                                                                </div>
                                                                                            </Col>:
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
                                                                })
                                                            }
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </>:
                (
                    <h1 className=" text-center lh-1">No Completed Gifts for you</h1>
                ) 
            }
        </div>
    )
}

export default MyGift
