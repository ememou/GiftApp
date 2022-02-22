import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {Col} from "react-bootstrap"

 const Layout = () => {
    const history = useHistory();
    const token =  localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin")
    useEffect(() => {
      if(token && isAdmin==='false'){
        history.push("/home");
      }
      else if(token && isAdmin==='true'){
        history.push("/homeadmin");
      }
    },[history, token, isAdmin]);

    return (
      <div className="d-flex justify-content-center vh-100 py-5" style={{
          textAlign :"center",
          backgroundImage: "url('/img/bgLayout.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
      }}>
        <Col md={4} className="py-5">
          <h1 style={{fontSize:'80px'}}><b><i>Gift App</i></b></h1>

          <h3 className="lh-base py-5"><b><i> Gift App helps you connect with your friends and help them make their wishes come true!!!</i></b></h3>
        </Col>
      </div>
    )
}

export default Layout;