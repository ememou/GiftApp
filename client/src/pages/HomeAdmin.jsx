import React from 'react'
import { Row, Col, Image,  } from "react-bootstrap"
import {Link} from 'react-router-dom'
import axios from 'axios'

const HomeAdmin = ({element: Component, account: shop, ...rest}) => {
    
    const handleDeleteAccount = (e) => {
        axios.delete("/imageShop/delete")
        .then(res =>{
            axios.delete("/shop/delete")
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
                localStorage.getItem("isAdmin")==="true"&&
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
                                                    <Image src={`http://localhost:5000/imageShop/${shop.shopPic}`} alt="profile pic" className="imgProfile rounded mb-2 img-thumbnail"/>:
                                                </li>
                                                <li className="list-inline-item">
                                                    <h4 className="mt-0 mb-0 " style={{ color: 'white' }}>{shop.brand}</h4>
                                                </li>
                                            </ul>
                                            
                                        </Col>
                                        <Col className="col-md-2 col-lg-1 col-sm-4 my-5 ms-auto">
                                            <Link to={`/shop/edit`} className="navbar-brand" >
                                                <h5 className="btn btn-outline-dark btn-sm btn-block mx-auto" style={{ background: 'white' }}>Edit profile</h5>
                                            </Link>
                                        </Col>
                                    </Row>
                                        
                                </div>
                            </div>
                            <div className="bg-light p-4 d-flex justify-content-end text-center">
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <Link  to={`/homeadmin/`} className="navbar-brand" >
                                            <small className="text-muted"> <i className="fas fa-list mr-1"></i> Home</small>
                                        </Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <small className="text-muted"> <i className="fas fa-chart-line mr-1"></i>Statistics</small>
                                    </li>
                                    <li className="list-inline-item">
                                        <small className="text-muted"><i className="fas fa-dolly-flatbed mr-1"></i> Stock</small>
                                    </li>
                                    <li className="list-inline-item">
                                        <span  className="ms-auto d-inline-flex p-2" role="button"  data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v"/></span>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <li onClick={handleDeleteAccount}><span className="dropdown-item">Delete Account</span></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="px-4 py-3">
                                <Component shop={shop} {...rest}/>
                            </div>
                        </div>
                    </Col>
                </div>
            }
        </>
    )
}

export default HomeAdmin
