import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Col, Row, ListGroup} from "react-bootstrap"
import {Link, useRouteMatch} from 'react-router-dom'
import Product from "../components/Product"
import Sidebar from "../components/Sidebar"
import categoryNames from "../Categories/categoryNames"

const Categories = ({account: user}) => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    const [searchData, setSearchData] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [show, setShow] = useState(false);

    const match = useRouteMatch("/eshops/:category");
    
    const selectedCategory = categoryNames.find(c=> c.name===match.params.category);
    

    useEffect(() => {
        let isApiSubscribed = true;
        const category = selectedCategory.path
        const body = JSON.stringify({category});
        axios.post(`/product/category`, body)
            .then(res =>{
                if (isApiSubscribed) {
                    const categoryChildren = []
                    res.data.forEach(categoryChild=>{
                        const child = categoryNames.find(c=> c.path===categoryChild)
                        if(child){
                            categoryChildren.push(child);
                        }
                    })
                    setCategories(categoryChildren);

                    if(!categoryChildren.length){
                        axios.post(`/product/productsCategory`, body)
                        .then(res =>{
                            setProducts(res.data)
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                }
            }).catch(err=>{
                console.log(err);
            })
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, [selectedCategory])

    const handleSearch = () =>{
        const data = searchData
        const body = JSON.stringify({data})
        axios.post(`/home/search/`, body)
            .then(res =>{
                setSearchResults(res.data);
                setShow(true);
            }).catch(err=>{
                console.log(err);
            })
    }

    return (
        <>
            {
                localStorage.getItem("isAdmin")==="false"&& 
                !show?
                (
                    (!categories.length && products.length)?
                    <>
                        <div>
                            <Sidebar user={user}/>
                        </div>
                        <main className='px-3'>
                            <div className="input-group text-center my-1">
                                <input className="form-control" type="text" placeholder="Search for Products..." onChange={(e)=>{setSearchData(e.target.value)}}/>
                                <span role="button" className="btn btn-secondary mx-1" type="submit" onClick={handleSearch} ><i className="fas fa-search"></i></span >
                            </div><br/>
                            {
                                selectedCategory.categoryBelongs&&
                                <Col className="d-flex flex-row bd-highlight mb-3">
                                    {    
                                        selectedCategory.categoryBelongs.map(belongs=>{
                                            return(
                                                <div className="d-flex flex-row bd-highlight mb-3" key={belongs.name}>
                                                    <Link to={`/eshops/${belongs.name}`} >
                                                        <h6 style={{width: "length"}} >{belongs.realName}</h6>
                                                    </Link>
                                                    <h6 style={{width: "length"}} >&nbsp;&nbsp;&gt;&nbsp;&nbsp;</h6>
                                                </div>
                                            )
                                        })
                                    }
                                </Col>
                            }
                            <h1 style={{color: "#40E0D0"}}><strong>{selectedCategory.realName}</strong></h1>
                            <div className="row px-3" style={{width: "100%"}}>
                                    {
                                        products.map(product=>{
                                            return (
                                            <div className='col-md-6 col-lg-6 col-sm-6' key={product._id} >
                                                <Product product = {product}/>
                                            </div>
                                            )
                                        })
                                    }
                            </div>
                        </main>
                    </>:
                    <div className='mx-5'>
                        <div className="input-group text-center my-1">
                            <input className="form-control" type="text" placeholder="Search for Products..." onChange={(e)=>{setSearchData(e.target.value)}}/>
                            <span role="button" className="btn btn-secondary mx-1" type="submit" onClick={handleSearch} ><i className="fas fa-search"></i></span >
                        </div><br/>
                        {
                            selectedCategory.categoryBelongs&&
                            <Col className="d-flex flex-row bd-highlight mb-3">
                                {    
                                    selectedCategory.categoryBelongs.map(belongs=>{
                                        return(
                                            <div className="d-flex flex-row bd-highlight mb-3" key={belongs.name}>
                                                <Link to={`/eshops/${belongs.name}`} >
                                                    <h6 style={{width: "length"}} >{belongs.realName}</h6>
                                                </Link>
                                                <h6 style={{width: "length"}} >&nbsp;&nbsp;&gt;&nbsp;&nbsp;</h6>
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                        }
                        <h1 style={{color: "#40E0D0"}}><strong>{selectedCategory.realName}</strong></h1>
                    <div className="row px-3" style={{width: "100%"}}>
                    {
                        categories.length?
                            categories.map(category=>{
                                return(
                                    <Col  md={4}  key={category._id}>
                                        <ListGroup.Item variant="flush" >
                                            <Row 
                                                className="bg-blue shadow rounded text-center overflow-hidden py-3 my-2" 
                                                style={{
                                                    backgroundColor: "rgb(0,148,148)",//${category.image}")`,
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat",
                                                    height:"100px"
                                                }}
                                            >
                                                <Link to={`/eshops/${category.name}`}>
                                                    <h4><strong>{category.realName}</strong></h4>
                                                </Link>
                                                <div  style={{
                                                    //backgroundColor: "gray",
                                                    //backgroundImage: `url("${category.image}")`,
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat",
                                                    height:"100%"
                                                }}/>
                                            </Row>
                                        </ListGroup.Item>
                                    </Col>
                                )
                            }):
                            <ListGroup.Item>
                                <h2 className="text-center text-wrap lh-1">No Products for this Category</h2>
                            </ListGroup.Item>
                    }
                    </div>
                </div>
                ):
                (
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
                )
            }
        </>
        
    )
}

export default Categories