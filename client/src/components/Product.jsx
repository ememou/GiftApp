import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({product}) => {
    return (
        <div  className="my-3 list-group">
            <div className="list-group-item" style={{height: '150px'}}>
                <div className='row justify-content-start'>
                    <div className="d-flex justify-content-center text-center">
                        <div>
                            <Link to={`/product/${product._id}`}>
                                <img src={product.imageLink} variant="top" alt="product" style={{maxWidth: '120px', maxHeight: '80px'}}/>
                            </Link>
                        </div>
                    </div>
                </div>
                <hr className="divider m-1"/>
                <div>
                    <Link to={`/product/${product._id}`} style={{textDecoration: "none"}}>
                        <h6 className='text-truncate' title={product.productName}><strong>{product.productName}</strong> </h6>{/*className="text-break"*/}
                    </Link>
                </div>
                
                <div>
                    <h6 ><strong>Price: {parseFloat(product.price).toFixed(2)}€</strong></h6>{/*className="text-break"*/}
                </div>
            </div>
        </div>
    )
}

export default Product