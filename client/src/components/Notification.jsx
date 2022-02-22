import React from 'react'
//import {Link} from 'react-router-dom'
import {  Row, Col, ListGroup } from 'react-bootstrap'

const Notification = ({notificationsList}) => {
    return (
        <Row>
            <h4> Notifications </h4>
            {
            notificationsList.length?
                (
                    notificationsList.map(notification=>{
                        return (
                            <ListGroup variant="flush" key={notification._id} className="bg-white shadow overflow-hidden">
                                <ListGroup.Item>
                                        <Col>
                                            <p className=" text-wrap lh-1">{notification.text}</p>
                                        </Col>
                                </ListGroup.Item>
                            </ListGroup> 
                        )
                    })
                ):
                (
                    <ListGroup variant="flush" className="bg-white shadow overflow-hidden">
                        <ListGroup.Item>
                            <h6 className=" text-wrap lh-1">No Notifications</h6>
                        </ListGroup.Item>
                    </ListGroup> 
                )   
            }
        </Row>
    )
}

export default Notification