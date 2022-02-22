import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Routes from './routes/Routes'
import Header from './components/Header'
import axios from 'axios'

const App = () => {
  const [user, setUser] = useState({});
  const [shop, setShop] = useState({});
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    if(token ){
      if(isAdmin==='false'){
        console.log("load User");
        axios.get('user/auth')
          .then(res=>{
            setUser(res.data);
          }).catch(err=>{
            localStorage.clear();
            console.log(err);
          });
      }
      else if(isAdmin==='true'){
        console.log("load Shop");
        axios.get('shop/auth')
          .then(res=>{
            setShop(res.data);
            //console.log(res.data)
          }).catch(err=>{
            localStorage.clear();
            console.log(err);
          });
      }
    }
  }, [token, isAdmin]);
  
  return (
    <div>
      <Header user={user}/>
      <Routes user={user} shop={shop}/>
      <ToastContainer position="bottom-right"/>
    </div>
  )
}

export default App