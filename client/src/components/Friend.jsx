import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Col, ListGroup, Row} from "react-bootstrap"

const Friend = ({user, userProfileData, isMe, weAreFriends}) => {
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        let isApiSubscribed = true;

        if(weAreFriends || isMe){
            const  { _id } = userProfileData;
            const body = JSON.stringify({_id})

            axios.post(`/user/friends`, body)
                .then(res =>{
                    if (isApiSubscribed) {
                        setFriendList(res.data);
                    }
                }).catch(err=>{
                    console.log(err);
                })
        }
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
        // eslint-disable-next-line
    }, [friendList])

    return (
        <Row>
            {
                friendList.length?
                <>
                    <h1 className=" text-center lh-1">Friendlist: {friendList.length} friends</h1>
                    {    
                        friendList.map(friend=>{
                            return (
                                <Col className="col-md-4 col-lg-4 col-sm-4" key={friend._id}>
                                    <ListGroup variant="flush" className="bg-white shadow rounded overflow-hidden my-3">
                                        <ListGroup.Item>
                                            <Row className='centerItem' style={{height: "80px"}}>
                                                <Col className="col-md-4 col-lg-4 col-sm-4">
                                                    <Link  to={`/profile/${friend.username}`} >
                                                        <img className='rounded-circle imgGoProf' src={`http://localhost:5000/image/${friend.profilePic}`} alt="profile pic" variant="top" />
                                                    </Link>
                                                </Col>
                                                <Col className="col-md-4 col-lg-4 col-sm-4">
                                                    <Link  to={`/profile/${friend.username}`} style={{textDecoration: 'none'}}>
                                                        <span>{friend.username}</span>
                                                    </Link>
                                                </Col>
                                                {
                                                    friend.weAreFriends&&
                                                    
                                                    <Col className="col-md-4 col-lg-4 col-sm-4">
                                                        <div className="input-group text-center dropstart" >
                                                            <span  className="ms-auto d-inline-flex p-2"><i className="fas fa-user-check"/></span>
                                                        </div>
                                                    </Col>
                                                }
                                                {
                                                    (friend._id!==user._id) && !friend.weAreFriends && 
                                                    <Col className="col-md-4 col-lg-4 col-sm-4">
                                                        <Col className="col-md-4 col-lg-4 col-sm-4">
                                                            <div className="input-group text-center dropstart" >
                                                                <span  className="ms-auto d-inline-flex p-2"><i className="fas fa-user-slash"/></span>
                                                            </div>
                                                        </Col>
                                                    </Col>
                                                }
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            )
                        })
                    }
                </>:
                (
                    <h1 className=" text-center lh-1">No Friends</h1>
                )  
            }
        </Row>
    )
}

export default Friend