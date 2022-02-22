import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const DonatedToGift = ({user}) => {
    /*friend */
    const [donatedTo, setDonatedTo] = useState([])
    
    useEffect(() => {
        let isApiSubscribed = true;
        
        axios.get(`/order/getDonatorData/`)
            .then(res =>{
                if (isApiSubscribed) {
                    setDonatedTo(res.data);
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
                donatedTo.length?
                <>
                    <h1 className=" text-center lh-1">Donated Gifts</h1>
                    {
                        donatedTo.map(gift=>{
                            return (
                                <div  className="m-3 list-group" key={gift.orderId}>
                                    <div className="list-group-item align-y-center">
                                        <div className='row'>
                                            <div className="col-4">
                                                <div className='list-inline d-flex'>
                                                    <div className='list-inline-item'>
                                                        {
                                                            gift.ownerExist?
                                                            <Link to={`/profile/${gift.ownerUsername}`} style={{textDecoration: 'none'}}>
                                                                <img  className='rounded-circle imgGoProf' src={`http://localhost:5000/image/${gift.ownerImg}`} alt="" variant="top" />
                                                            </Link>:
                                                            <img  className='rounded-circle imgGoProf' src={`http://localhost:5000/image/${gift.ownerImg}`} alt="" variant="top" />
                                                        }
                                                    </div>
                                                    <div className='list-inline-item'>
                                                        {
                                                            gift.ownerExist?
                                                            <Link to={`/profile/${gift.ownerUsername}`} style={{textDecoration: 'none'}}>
                                                                <figure>
                                                                    <blockquote className="blockquote">
                                                                    <h5> <em> <strong>{gift.ownerUsername}</strong></em></h5>
                                                                    </blockquote>
                                                                    <figcaption className="blockquote-footer">
                                                                        <cite title="Source Title">{gift.createdAt}</cite>
                                                                    </figcaption>
                                                                </figure>
                                                            </Link>:
                                                            <figure>
                                                                <blockquote className="blockquote">
                                                                <h5> <em> <strong>{gift.ownerUsername}</strong></em></h5>
                                                                </blockquote>
                                                                <figcaption className="blockquote-footer">
                                                                    <cite title="Source Title">{gift.createdAt}</cite>
                                                                </figcaption>
                                                            </figure>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-8'>
                                                <div className="d-flex mx-5 text-center">
                                                    <div>
                                                        <span> You had contributed <em style={{fontSize: '1.5rem'}}> {gift.amount}$ </em> for this Gift!</span><br/>
                                                        <span>At <em style={{fontSize: '1.2rem'}}>  {gift.donatedAt} </em></span>
                                                    </div>
                                                </div>
                                            </div>
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
                    <h1 className=" text-center lh-1">No Donated Gifts</h1>
                ) 
            }
        </div>
    )
}

export default DonatedToGift
