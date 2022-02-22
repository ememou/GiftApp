import React, {useState} from 'react'
import { Col, Row, ListGroup} from "react-bootstrap"
import {Link} from 'react-router-dom'
import axios from 'axios'
import categories from "../Categories/allCategories"
import Product from "../components/Product"

const Eshop = () => {
    const [searchData, setSearchData] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [show, setShow] = useState(false);

    const handleSearch = () =>{
        const data = searchData
        const body = JSON.stringify({data})
        axios.post(`/product/search/`, body)
            .then(res =>{
                setSearchResults(res.data);
                setShow(true);
                console.log(res.data)
            }).catch(err=>{
                console.log(err);
            })
    }

    return (
        <>
            {
                !show?
                <div className='mx-5'>
                    <div className="input-group text-center my-1">
                        <input className="form-control" type="text" placeholder="Search for Products..." onChange={(e)=>{setSearchData(e.target.value)}}/>
                        <span role="button" className="btn btn-secondary mx-1" type="submit" onClick={handleSearch} ><i className="fas fa-search"></i></span >
                    </div><br/>

                    <h1 style={{color: "#40E0D0"}}>Categories</h1>
                    <div className="row px-3">
                        {
                            categories.map(category=>{
                                return(
                                    <Col  md={4}  key={category._id}>
                                        <ListGroup.Item variant="flush" >
                                            <div 
                                                className="bg-blue shadow rounded text-center overflow-hidden py-3 my-2" 
                                                style={{
                                                    backgroundColor: "rgb(65,148,148)",//backgroundImage: `url("${category.image}")`,
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat",
                                                    height:"200px"
                                                }}
                                            >
                                                <Link to={`/eshops/${category.name}`}>
                                                    <h4><strong>{category.realName}</strong></h4>
                                                </Link>
                                                <Row >
                                                    {
                                                        category.children.map(el=>{
                                                            return(
                                                                <Link to={`/eshops/${el.name}`} key={el.name} className=" py-1">
                                                                    {el.realName}
                                                                </Link>
                                                            )    
                                                        })
                                                    }
                                                </Row>
                                                {/*<div  style={{
                                                    backgroundImage: `url("${category.image}")`,
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat",
                                                    height:"100%"
                                                }}/>*/}
                                            </div>
                                        </ListGroup.Item>
                                    </Col>
                                )
                            })
                        }
                    </div>
                </div>:
                <>
                    {
                        searchResults.length?
                        <div className="row px-3">
                            <div className="input-group text-center my-1">
                                <input className="form-control" type="text" placeholder="Search for Products..." onChange={(e)=>{setSearchData(e.target.value)}}/>
                                <span role="button" className="btn btn-secondary mx-1" type="submit" onClick={handleSearch} ><i className="fas fa-search"></i></span >
                            </div><br/>
                            <div className="row px-3" style={{width: "100%"}}>
                                    {
                                        searchResults.map(product=>{
                                            return (
                                            <div className='col-md-6 col-lg-6 col-sm-6' key={product._id} >
                                                <Product product = {product}/>
                                            </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>:
                        <>
                            <div className="input-group text-center my-1">
                                <input className="form-control" type="text" placeholder="Search for Products..." onChange={(e)=>{setSearchData(e.target.value)}}/>
                                <span role="button" className="btn btn-secondary mx-1" type="submit" onClick={handleSearch} ><i className="fas fa-search"></i></span >
                            </div><br/>
                            <h1 className=" text-center lh-1">No Results</h1>
                        </>
                    }
                </>
            }
        </>
    )
}

export default Eshop