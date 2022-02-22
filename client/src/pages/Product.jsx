import React, {useEffect, useState} from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import axios from 'axios'
import {Col, Row, Image, ListGroup, Button, Collapse} from "react-bootstrap"

const Product = () => {
    const match = useRouteMatch("/product/:id");
    const _id =match.params.id;

    const [product, setProduct] = useState({});
    const [existToMyList, setExistToMyList] = useState(false)
    const [giftDescription, setGiftDescription] = useState("");
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        let isApiSubscribed = true;
        
        let body = JSON.stringify({_id});
        axios.post(`/product/product/`, body)
            .then(res =>{
                if (isApiSubscribed) {
                    setProduct(res.data);
                    
                    const {_id} = res.data;
                    body = JSON.stringify({_id});
                    axios.post(`/product/existtomylist/`, body)
                        .then(res =>{
                            if(res.data){
                                setExistToMyList(true);
                                setGiftDescription(res.data.description);
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                }
            }).catch(err=>{
                console.log(err);
            })
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, [_id])

    const handleAdd = () =>{
        const  { _id } = product;
        const body = JSON.stringify({_id})
        
        axios.post("/product/addtoyourlist", body)
        .then(res =>{
            setExistToMyList(true);
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleDelete = () =>{
        const  { _id } = product;
        const body = JSON.stringify({_id})
        
        axios.post("/product/deletefromyourlist", body)
        .then(res =>{
            setExistToMyList(false);
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleEdit = () =>{
        const  { _id } = product;
        const  description = giftDescription;
        const body = JSON.stringify({description, _id})
        
        axios.post("/product/editgift", body)
        .then(res =>{
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <>
            {
                localStorage.getItem("isAdmin")==="false"&& 
                <div className="vh-100 px-2 my-5" style={{
                    width:"99%",
                    backgroundImage: "url('/img/bgProduct.png')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}>
                    <Row style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Link to="/eshops" className="px-5">
                            <i className="fas fa-arrow-left"/>
                            &nbsp; Categories
                        </Link>
                        <Col md={5}  className="my-5" style={{textAlign:"center"}}>
                            <a href={`${product.productLink}`}>
                                <Image src={product.imageLink}  alt="{product.productName}" fluid style={{maxHeight:"500px", maxWidth:"500px"}} className="rounded shadow mb-2 img-thumbnail"></Image>
                            </a>
                                
                            
                        </Col>
                        <Col md={4} className="my-5">
                            <Col md={10} style={{textAlign:"center"}}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <a href={`${product.productLink}`} style={{textDecoration: "none"}}>
                                        <h3>{product.productName}</h3> 
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item> Price : {product.price} €</ListGroup.Item>
                                <ListGroup.Item> Shipping : {product.shippingCost} € </ListGroup.Item>
                                <ListGroup.Item> Description : {product.description} </ListGroup.Item>
                            </ListGroup>
                            </Col>
                        </Col>
                        <Col md={3} className="my-5" >
                            <Col md={10}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status: &nbsp; {product.countInSTock > 0 ? "In Stock" : "Out of Stock"}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {
                                        
                                    }
                                        {
                                            product.countInSTock > 0 &&
                                            <ListGroup.Item style={{textAlign:"right"}}>
                                                {
                                                    existToMyList?
                                                    <>
                                                        <Button className="btn btn-danger" type="button" onClick={handleDelete}>Delete from your WishList</Button>
                                                        <Button
                                                            onClick={() => setOpen(!open)}
                                                            aria-controls="collapse-text"
                                                            aria-expanded={open} className="btn btn-info">
                                                            Add description for this Gift
                                                        </Button>
                                                        <Collapse in={open} className="my-3">
                                                            <div id="collapse-text">
                                                                <input type="form" value={giftDescription} className="form-control" onChange={e=>setGiftDescription(e.target.value)}/>
                                                                <Button type="submit" className="btn btn-secondary" onClick={handleEdit} >Proceed</Button>
                                                            </div>
                                                        </Collapse>
                                                    </>:
                                                    <Button className="btn-block" type="button" onClick={handleAdd}>Add to your WishList</Button>
                                                }
                                            
                                            </ListGroup.Item>
                                        }
                                    </ListGroup>
                            </Col>
                            
                        </Col>
                    </Row>
                </div>
            }
        </>
        
        
    )
}

export default Product
