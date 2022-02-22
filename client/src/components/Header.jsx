import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Notification from "./Notification"
import FriendRequest from "./FriendRequest"

const Header = ({user}) => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem("isAdmin");

    const [notifications, setNotifications] = useState(0)
    const [notificationsList, setNotificationsList] = useState([]);
    const titleNotifications = <>
                                    <i className=" fa fa-bell"/>
                                    {
                                        notifications?
                                        <span className='notificationNumber'>{notifications}</span>:<></>
                                    }
                                    
                                </>
    useEffect(() => {
        if( token && isAdmin==='false'){
            let isApiSubscribed = true;
            axios.get(`/user/notifications`)
                .then(res =>{
                    if (isApiSubscribed) {
                        setNotificationsList(res.data.notifications);
                        setNotifications(res.data.countNotifications)
                    }
                }).catch(err=>{
                    console.log(err);
                })
            return () => {
                // cancel the subscription
                isApiSubscribed = false;
            };
        }
       
    }, [token, isAdmin])
    const handleSetReadedNotifications = ()=>{
        axios.get("/user/setReadedNotifications")
        .then(res =>{
            setNotifications(0);
            //console.log(res.data);
        }).catch(err=>{
            console.log(err)
        })
    }

    const [requests, setRequests] = useState(0)
    const [requestList, setRequestList] = useState([]);
    const titleFriendRequests =<>
                                    <i className="fa fa-user-friends "/>
                                    {
                                        requests?
                                        <span className='notificationNumber'>{requests}</span>:<></>
                                    }
                                </>
    useEffect(() => {
        if( token && isAdmin==='false'){
            let isApiSubscribed = true;
            axios.get(`/user/getfriendrequests`)
                .then(res =>{
                    if (isApiSubscribed) {
                        setRequestList(res.data.requestsData);
                        setRequests(res.data.countRequest)
                    }
                }).catch(err=>{
                    console.log(err);
                })
            
            return () => {
                // cancel the subscription
                isApiSubscribed = false;
            };
        }
    }, [token, isAdmin])
    const handleSetReadedRequest = ()=>{
        axios.get("/user/setReadedRequests")
        .then(res =>{
            setRequests(0)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    {    
                        !token&& 
                            <>
                                <a className="navbar-brand" href="/"><img className='imgLogo' src={'/img/logo.png'} alt="logo" />Gift App</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                                        <li><a className="nav-link" href="/register">Register</a></li>
                                        <li><a className="nav-link" href="/login">Login</a></li>
                                        <li><a className="nav-link" href="/registeradmin">Register As Partner</a></li>
                                        <li><a className="nav-link" href="/loginadmin">Login As Partner</a></li>
                                    </ul>
                                </div>
                            </>
                    }
                    {
                        token && isAdmin==='false' &&
                        <>
                            {/*offcanvas Trigger*/}
                            <button className="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                <span className="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
                            </button>
                            {/*offcanvas Trigger End*/}
                            <a className="navbar-brand me-auto" href="/home"><img className='imgLogo' src={'/img/logo.png'} alt="logo" />Gift App</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="nav navbar-nav ms-auto nav-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/home">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/eshops">Gifts</a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link" href={`/profile/${user.username}`}><img className='border imgGoProf rounded-circle' src={`http://localhost:5000/image/${user.profilePic}`} alt="" /></a>
                                    </li>

                                    <li className="nav-item dropdown py-2">
                                        <span className="nav-link dropdown-toggle " onClick={handleSetReadedNotifications} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {titleNotifications}
                                        </span>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <li style={{maxHeight: "45rem", overflowY: "scroll", minWidth: "14rem", overflowX: "hidden"}}> <Notification notificationsList={notificationsList}/></li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown py-2">
                                        <span className="nav-link dropdown-toggle" onClick={handleSetReadedRequest} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {titleFriendRequests}
                                        </span>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <li style={{maxHeight: "45rem", overflowY: "scroll", minWidth: "15rem", overflowX: "hidden" }}> <FriendRequest requestList={requestList} user={user}/></li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown py-2">
                                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Settings
                                        </span>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="aboutus">About Us</a></li>
                                            <li><a className="dropdown-item" href="#action/3.3">Privacy Policy</a></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><a className="dropdown-item" onClick={()=> localStorage.clear()} href="/">Logout</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </>
                    }
                    {
                        token && isAdmin==='true' &&
                        <>
                            <a className="navbar-brand" href="/homeadmin"><img className='imgLogo' src={'/img/logo.png'} alt="logo" />Gift App</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto px-3 mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Settings
                                        </span>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="aboutus">About Us</a></li>
                                            <li><a className="dropdown-item" href="#action/3.3">Privacy Policy</a></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><a className="dropdown-item" onClick={()=> localStorage.clear()} href="/">Logout</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </>
                    }

                </div>
            </nav>
        </>
    )
}

export default Header
