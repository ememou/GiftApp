import axios from 'axios'
import {Link} from 'react-router-dom'
import { Row, Button, ListGroup } from 'react-bootstrap'

const FriendRequest = ({user, requestList}) => {
    const handleAccept = (e) => {
        const _id =  e.target.getAttribute('senderid');
        const body = JSON.stringify({_id})

        //console.log(_id);
        axios.post("/user/acceptfriendrequest", body)
        .then(res =>{
            window.location.reload();
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleReject = (e) => {
        const _id =  e.target.getAttribute('senderid');
        const body = JSON.stringify({_id})
        
        axios.post("/user/rejectfriendrequest", body)
        .then(res =>{
            window.location.reload();
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <Row>
            <h4> Friend Requests </h4>
            {requestList.length?
            (
                requestList.map(friend=>{
                    return (
                        <ListGroup variant="flush" key={friend._id} className="bg-white shadow overflow-hidden p-1">
                            <ListGroup.Item>
                                <Row >
                                    <Link to={`/profile/${friend.sender.username}`} style={{textDecoration: 'none'}}>
                                       <img className='imgGoProf rounded-circle' src={`http://localhost:5000/image/${friend.sender.profilePic}`} alt="profile pic" variant="top"/>
                                        <span> {friend.sender.username}</span>
                                    </Link>
                                </Row>
                                <div className='col'>
                                    <div className="d-flex justify-content-end">
                                        <div >
                                            <Button className="btn btn-secondary btn1" senderid={friend.sender._id} onClick={handleAccept}>Accept</Button>
                                        </div>
                                        <div >
                                            <Button className="btn btn-danger btn2" senderid={friend.sender._id} onClick={handleReject}>Reject</Button>
                                        </div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                                
                        </ListGroup>        
                    )
                })
            ):
            (
                <ListGroup variant="flush" className="bg-white shadow overflow-hidden">
                    <ListGroup.Item>
                        <h6 className=" text-wrap lh-1">No Friend Requests</h6>
                    </ListGroup.Item>
                </ListGroup> 
            )
                            
            }
        </Row>
    )
}

export default FriendRequest
