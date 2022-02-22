import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Col, Collapse, Form } from 'react-bootstrap'
import Product from './Product'

const Gift = ({gift, isMine, meDonator}) => {
    //Button
    const [ value, setValue ] = useState(0);
    
    const [giftDescription, setGiftDescription] = useState(gift.description);
    const [open, setOpen] = useState(false);

    ////isMine=true options
    const handleDelete = () =>{
        const  { _id } = gift.product;
        const body = JSON.stringify({_id})
        
        axios.post("/product/deletefromyourlist", body)
        .then(res =>{
        }).catch(err=>{
            console.log(err)
        })
    }
    const handleEdit = () =>{
        const  { _id } = gift.product;
        const  description = giftDescription;
        const body = JSON.stringify({description, _id})
        
        axios.post("/product/editgift", body)
        .then(res =>{
        }).catch(err=>{
            console.log(err)
        })
    }
    ////isMine=false options meDonator=false
    const handleContribute = () =>{
        if(value>0){
            const  { _id } = gift;
            const body = JSON.stringify({_id, value})
            
            axios.post("/transactions/addmoney", body)
            .then(res =>{
            }).catch(err=>{
                console.log(err)
            })
        }
        
    }
    ////isMine=false options meDonator=true
    const handleEditAmount = () =>{
        if(value>0){
            const  { _id } = gift;
            const body = JSON.stringify({_id, value})
            
            axios.post("/transactions/editmoney", body)
            .then(res =>{
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    const handleDeleteAmount = () =>{
        const  { _id } = gift;
        const body = JSON.stringify({_id})
        
        axios.post("/transactions/deletemoney", body)
        .then(res =>{
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
            <div  className="m-3 list-group">
                <div className="list-group-item align-y-center">
                    <div className='row'>
                        <div className="col">
                            <div className='list-inline d-flex'>
                                <div className='list-inline-item'>
                                    <Link to={`/profile/${gift.recipient.username}`} style={{textDecoration: 'none'}}>
                                        <img  className='rounded-circle imgGoProf' src={`http://localhost:5000/image/${gift.recipient.profilePic}`} alt="" variant="top" />
                                    </Link>
                                </div>
                                <div className='list-inline-item'>
                                    <Link to={`/profile/${gift.recipient.username}`} style={{textDecoration: 'none'}}>
                                        <figure>
                                            <blockquote className="blockquote">
                                            <h5> <em> <strong>{gift.recipient.username}</strong></em></h5>
                                            </blockquote>
                                            <figcaption className="blockquote-footer">
                                                <cite title="Source Title">{gift.createdAt}</cite>
                                            </figcaption>
                                        </figure>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/*Gift owner */}

                        {//Dika mou Dwra ////Wishlist
                            isMine&&
                            <>
                            <div className='col'>
                                <div className="d-flex justify-content-end">
                                    <div>
                                        <button className="btn btn-danger" type="button" onClick={handleDelete}>Delete</button>
                                    </div>
                                    
                                    &nbsp;&nbsp;
                                    <div>
                                        <button
                                            onClick={() => setOpen(!open)}
                                            aria-controls="collapse-text"
                                            aria-expanded={open} className="btn btn-info ms-auto">
                                            Edit
                                        </button>
                                    </div>
                                </div> 
                            </div>
                                <Collapse in={open} className="my-3">
                                    <div id="collapse-text">
                                        <input type="form" value={giftDescription} className="form-control" onChange={e=>setGiftDescription(e.target.value)}/>
                                        <button type="submit" className="btn btn-secondary" onClick={handleEdit} >Proceed</button>
                                    </div>
                                </Collapse>
                            </>
                        }
                        {//Dora allwn poy den exw valei lefta ///Home
                            !isMine&& !meDonator&&
                            <>
                                <div className='col'>
                                    <div className="d-flex justify-content-center text-center">
                                        <div>
                                                <span> {`${parseFloat(gift.product.price + gift.product.shippingCost - gift.totalAmount).toFixed(2)} € to go!`}</span><br/>
                                                <em> Do you want to contribute?</em>
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="d-flex justify-content-end">
                                        <div>
                                            <button
                                                onClick={() => setOpen(!open)}
                                                aria-controls="collapse-text"
                                                aria-expanded={open} className="btn btn-info" >
                                                Contribute
                                            </button>
                                        </div>
                                    </div>
                                </div>
                               
                                <Collapse in={open} className="my-3">
                                    <div id="collapse-text">
                                        <div className='list-inline d-flex'>
                                            <div className='list-inline-item'>
                                                <div className="d-flex justify-content-start text-center">
                                                    <div>
                                                        <span className="text-center">0 €</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='list-inline-item'style={{width:"85%"}}>
                                                <div className="d-flex justify-content-center text-center d-flex" >
                                                    <div className='col-10'>
                                                        <input type="range" className="form-range" 
                                                            min="0" 
                                                            max={parseFloat(gift.product.price + gift.product.shippingCost - gift.totalAmount).toFixed(2)}
                                                            step="0.01" 
                                                            value={value}
                                                            onChange={e => setValue(e.target.value)}>
                                                        </input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='list-inline-item'>
                                                <div className="d-flex justify-content-end text-center">
                                                    <div>
                                                        <span>{`${parseFloat(gift.product.price + gift.product.shippingCost - gift.totalAmount).toFixed(2)} €`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Form>
                                            <Col  className="col-md-3 col-lg-3 col-sm-3 ms-auto">
                                                <span className="border border-4 py-2">
                                                    Amount&nbsp;&nbsp;€&nbsp;&nbsp;
                                                    <input type="number" className="border border-0" style={{width: "25%"}} min="0" step="0.01" 
                                                        max={parseFloat(gift.product.price + gift.product.shippingCost - gift.totalAmount).toFixed(2)} 
                                                        value={value} onChange={e=>setValue(e.target.value)}/>
                                                </span>
                                                <button type="button" className="btn btn-secondary btn1" onClick={handleContribute}>Proceed</button>
                                            </Col>
                                        </Form>
                                    </div>
                                </Collapse>
                            </>
                        }
                        {//Dora allwn poy exw valei lefta //Pending
                            !isMine&& meDonator&&
                            <>
                                <div className='col'>
                                    <div className="d-flex justify-content-center text-center">
                                        <div>
                                            <span> You have donated <em style={{fontSize: '1.5rem'}}>{parseFloat(gift.myDonationAmount).toFixed(2)}€ </em> for this Gift! </span><br />
                                            <small className='lh-1 '>At {gift.donatedAt}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="d-flex justify-content-end">
                                        <div>
                                            <button className="btn btn-danger" onClick={handleDeleteAmount}>Delete</button>
                                            &nbsp;&nbsp;
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => setOpen(!open)}
                                                aria-controls="collapse-text"
                                                aria-expanded={open} className="btn btn-info">
                                                Add More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <Collapse in={open} className="my-3">
                                    <div id="collapse-text">
                                        <div className='list-inline d-flex'>
                                            <div className='list-inline-item'>
                                                <div className="d-flex justify-content-start text-center">
                                                    <div>
                                                        <span className="text-center">0 €</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='list-inline-item'style={{width:"85%"}}>
                                                <div className="d-flex justify-content-center text-center d-flex" >
                                                    <div className='col-10'>
                                                        <input type="range" className="form-range" 
                                                            min="0" 
                                                            max={parseFloat(gift.product.price + gift.product.shippingCost - gift.totalAmount).toFixed(2)} 
                                                            step="0.01" 
                                                            value={value}
                                                            onChange={e => setValue(e.target.value)}>
                                                        </input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='list-inline-item'>
                                                <div className="d-flex justify-content-end text-center">
                                                    <div>
                                                        <span>{`${parseFloat(gift.product.price + gift.product.shippingCost - gift.totalAmount).toFixed(2)} €`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Form>
                                            <Col  className="col-md-3 col-lg-3 col-sm-3 ms-auto">
                                                <span className="border border-4 py-2">
                                                    Amount&nbsp;&nbsp;€&nbsp;&nbsp;
                                                    <input type="number" className="border border-0" style={{width: "25%"}} min="0" step="0.01" 
                                                        max={parseFloat(gift.product.price + gift.product.shippingCost - gift.totalAmount).toFixed(2)} 
                                                        value={value} onChange={e=>setValue(e.target.value)}/>
                                                </span>
                                                <button type="button" className="btn btn-secondary btn1" onClick={handleEditAmount}>Proceed</button>
                                            </Col>
                                        </Form>
                                            
                                    </div>
                                </Collapse>
                            </>
                        }
                    </div >
                    
                </div>
                <div className="list-group-item">
                    {
                        gift.description&&
                        <p className='text-center lh-1'>
                            <span className='fs-5' >
                                {gift.recipient.username} said: 
                            </span>
                            <em> {gift.description}</em>
                        </p>
                        
                    }
                    <Product product = {gift.product}/>
                </div>
            </div>
    )
}

export default Gift
