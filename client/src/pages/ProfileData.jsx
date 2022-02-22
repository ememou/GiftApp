import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useRouteMatch} from 'react-router-dom'
import {Col, Row, Button, Image} from "react-bootstrap"
import { useHistory } from 'react-router'

const ProfileData = ({element: Component, account: user, userProfile, ...rest}) => {
    const match = useRouteMatch("/profile/:username");
    userProfile = match.params.username;
    
    const [hidden, setHidden] = useState(false);
    const [accept, setAccept] = useState(false);

    const [isMe, setIsMe] = useState(false);
    const [weAreFriends, setWeAreFriends] = useState(false)
    const [userProfileData, setUserProfileData] = useState({})
    
    const history = useHistory();

    useEffect(() => {
        let isApiSubscribed = true;
        axios.get(`/user/${userProfile}`)
            .then(res =>{
                if (isApiSubscribed) {
                    setUserProfileData(res.data);
                    
                    if(JSON.stringify(userProfileData.username) === JSON.stringify(user.username)){
                        setIsMe(true);
                    }
                    else{
                        setIsMe(false);
                    }
                    //if my friendList contains userProfileData id
                    let friend = false;
                    if(user.friendList){ friend = user.friendList.some(f => f === userProfileData._id); }
                    
                    if(user.friendList !== null && friend){ setWeAreFriends(true); }
                    else{
                        const  { _id } = userProfileData;
                        const body = JSON.stringify({ _id })
                        axios.post(`/user/getpendingrequest`, body)
                            .then(res =>{
                                    if(res.data){
                                        
                                        if(res.data.sender === user._id){
                                            setHidden(true);
                                        }
                                        else if(res.data.sender === userProfileData._id){
                                            setAccept(true);
                                        }
                                    }
                            }).catch(err=>{
                                console.log(err);
                            })
                        setWeAreFriends(false);
                    }
                }
            }).catch(err=>{
                console.log(err);
            })
        
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, [userProfile, user, userProfileData])

    const handleCancelRequest = () => {

        const  { _id } = userProfileData;
        const body = JSON.stringify({_id})
        
        axios.post("/user/cancelfriendrequest", body)
        .then(res =>{
            setHidden(false);
            window.location.reload();
        }).catch(err=>{
            console.log(err.response.data.msg)
        })
    }
    
    const handleSendRequest = () => {
        
        const  { _id } = userProfileData;
        const body = JSON.stringify({_id})
        
        axios.post("/user/sendfriendrequest", body)
        .then(res =>{
            setHidden(true);
            window.location.reload();
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleAccept = () => {
        const  { _id } = userProfileData;
        const body = JSON.stringify({_id})
        
        axios.post("/user/acceptfriendrequest", body)
        .then(res =>{
            setWeAreFriends(true)
            history.push(`/profile/${userProfileData.username}`);
            window.location.reload();
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleReject = () => {
        const  { _id } = userProfileData;
        const body = JSON.stringify({_id})
        
        axios.post("/user/rejectfriendrequest", body)
        .then(res =>{
            setWeAreFriends(false)
            history.push(`/profile/${userProfileData.username}`);
            window.location.reload();
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleUnfriend = (e) => {
        const {_id} =  userProfileData;
        const body = JSON.stringify({_id})
        console.log(body);
        axios.post("/user/unfriend", body)
        .then(res =>{
            window.location.reload();
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleDeleteAccount = (e) => {
        axios.delete("/image/delete")
        .then(res =>{
            axios.delete("/user/delete")
            .then(res =>{
                localStorage.clear();
                window.location.reload();
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <>
            {
                localStorage.getItem("isAdmin")==="false"&& 
                <div className="py-3 px-4 ">
                    <Col className="mx-auto">
                        <div className="bg-white shadow rounded overflow-hidden">
                            <div className="px-4 pt-0 pb-4" style={{
                                backgroundImage: "url('/img/bgProfile.jpg')",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}>
                                <div className="media align-items-end" style={{transform: "translateY(3rem)"}}>
                                    <Row>
                                        <Col className="mr-3 col-md-10 col-lg-10 col-sm-8">
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item">
                                                    <Image src={`http://localhost:5000/image/${userProfileData.profilePic}`} alt="profile pic" className="imgProfile rounded mb-2 img-thumbnail"/>
                                                </li>
                                                <li className="list-inline-item">
                                                    <h4 className="mt-0 mb-0 " style={{ color: 'white' }}>{userProfileData.username}</h4>
                                                    {
                                                        userProfileData.birthDate &&
                                                        <p className=" mb-4" style={{ color: 'white' }}> <i className="fas fa-birthday-cake mr-2"></i>&nbsp; {userProfileData.birthDate}</p>
                                                    }
                                                </li>
                                            </ul>
                                            
                                        </Col>
                                        {
                                            isMe &&
                                            <Col className="col-md-2 col-lg-1 col-sm-4 my-5 ms-auto">
                                                <Link to={`/profile/${user.username}/edit`} className="navbar-brand" >
                                                    <h5 className="btn btn-outline-dark btn-sm btn-block mx-auto" style={{ background: 'white' }}>Edit profile</h5>
                                                </Link>
                                            </Col>
                                        }  
                                    </Row>
                                        
                                </div>
                            </div>
                            

                            <div className="bg-light p-4 d-flex justify-content-end text-center">
                                <ul className="list-inline mb-0">
                                    {
                                        (!isMe && !weAreFriends)&&
                                        <li className="list-inline-item">
                                            {
                                                !accept?
                                                <>
                                                    <Button className="btn btn-info" variant="primary" hidden={hidden} onClick={handleSendRequest}>
                                                        <h5 className="font-weight-bold mb-0 d-block">Send Request</h5>
                                                        <i className="fas fa-user-plus mr-1"></i> 
                                                    </Button >
                                                    <Button className="btn btn-danger" variant="primary" hidden={!hidden} onClick={handleCancelRequest}>
                                                        <h5 className="font-weight-bold mb-0 d-block">Cancel Request</h5>
                                                        <i className="fas fa-user-slash mr-1"></i> 
                                                    </Button>
                                                </>:
                                                <>
                                                    <Button className="btn btn-info" variant="primary" hidden={!accept} onClick={handleAccept}>
                                                        <h5 className="font-weight-bold mb-0 d-block">Accept Request</h5>
                                                        <i className="fas fa-user mr-1"></i> 
                                                    </Button>
                                                    <Button className="btn btn-danger" variant="primary" hidden={!accept} onClick={handleReject}>
                                                        <h5 className="font-weight-bold mb-0 d-block">Reject Request</h5>
                                                        <i className="fas fa-user-slash mr-1"></i> 
                                                    </Button>
                                                </>
                                            }
                                        </li>
                                    }
                                    {
                                        (isMe || weAreFriends)&&
                                        <>
                                            <li className="list-inline-item">
                                                <Link  to={`/profile/${userProfile}`} className="navbar-brand" >
                                                    <small className="text-muted"> <i className="fas fa-list mr-1"></i> WishList</small>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link to={`/profile/${userProfile}/friends`} className="navbar-brand" >
                                                    <small className="text-muted"> <i className="fas fa-user mr-1"></i> Friends</small>
                                                </Link>
                                            </li>
                                            {
                                                weAreFriends&&
                                                <li className="list-inline-item">
                                                    <span  className="ms-auto d-inline-flex p-2" role="button"  data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"/></span>
                                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                                        <li onClick={handleUnfriend}><span className="dropdown-item">Delete Friend</span></li>
                                                    </ul>
                                                </li>
                                            }
                                        </>
                                    }
                                    {
                                        isMe &&
                                        <>
                                            <li className="list-inline-item">
                                                <Link to={`/profile/${user.username}/mygifts`} className="navbar-brand" >
                                                    <small className="text-muted"> <i className="fas fa-gift mr-1"></i> My Gifts</small>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link to={`/profile/${user.username}/donatedto`} className="navbar-brand" >
                                                    <small className="text-muted"><i className="fas fa-gifts mr-1"></i> Donated to</small>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link to={`/profile/${user.username}/pending`} className="navbar-brand" >
                                                    <small className="text-muted"> <i className="fas fa-shopping-cart mr-1"></i> Pending</small>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <span  className="ms-auto d-inline-flex p-2" role="button"  data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"/></span>
                                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                                    <li onClick={handleDeleteAccount}><span className="dropdown-item">Delete Account</span></li>
                                                </ul>
                                            </li>
                                        </>
                                    }
                                </ul>
                            </div>
                            <div className="px-4 py-3">
                                {
                                    (userProfileData.bio) &&
                                    <>
                                        <h5 className="mb-0">About</h5>
                                        <div className="p-4 rounded shadow-sm bg-light">
                                            <p>{userProfileData.bio}</p>
                                        </div>
                                    </>
                                }
                            </div>
                            {
                                (isMe || weAreFriends) &&
                                <div className="px-4 py-3">
                                    <Component user={user} userProfileData={userProfileData} isMe={isMe} weAreFriends={weAreFriends} {...rest}/>
                                </div>
                            }
                            
                        </div>
                    </Col>
                </div>
            }
        </>
        
    )
}

export default ProfileData