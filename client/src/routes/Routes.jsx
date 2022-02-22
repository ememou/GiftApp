import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Layout from '../pages/auth/Layout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import RegisterAdmin from '../pages/auth/RegisterAdmin'
import LoginAdmin from '../pages/auth/LoginAdmin'

import HomeAdmin from '../pages/HomeAdmin'
import EditShop from '../pages/EditShop'
import UploadProducts from '../components/UploadProducts'

import Home from '../pages/Home'
import EditProfile from '../pages/EditProfile'
import ProfileData from '../pages/ProfileData'

import WishList from "../components/WishList"
import Friends from '../components/Friend'
import MyGifts from '../components/MyGift'
import DonatedTo from '../components/DonatedToGift'
import Pending from '../components/PendingGift'

import Eshop from '../pages/Eshop'
import Categories from '../pages/Categories'
import Product from '../pages/Product'

const Routes = ({user, shop}) => {
  
  return (
    <Switch>
      <Route exact path="/" component={Layout}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/registeradmin" component={RegisterAdmin}/>
      <Route exact path="/loginadmin" component={LoginAdmin}/>

      <PrivateRoute exact path="/homeadmin" component={HomeAdmin} element={UploadProducts} account={shop}/>
      <PrivateRoute exact path="/shop/edit" component={EditShop} account={shop}/>

      <PrivateRoute exact path="/home" component={Home} account={user}/>
      
      <PrivateRoute exact path="/profile/:username" component={ProfileData} account={user} element={WishList}/>
      <PrivateRoute exact path="/profile/:username/friends" component={ProfileData} account={user} element={Friends}/>
      <PrivateRoute exact path="/profile/:username/mygifts" component={ProfileData} account={user} element={MyGifts}/>
      <PrivateRoute exact path="/profile/:username/donatedto" component={ProfileData} account={user} element={DonatedTo}/>
      <PrivateRoute exact path="/profile/:username/pending" component={ProfileData} account={user} element={Pending}/>

      <PrivateRoute exact path="/profile/:username/edit" component={EditProfile} account={user}/>
      <PrivateRoute exact path="/eshops" component={Eshop} account={user}/>
      <PrivateRoute exact path="/eshops/:category" component={Categories} account={user}/>

      <PrivateRoute exact path="/product/:id" component={Product} account={user}/>
   </Switch>
  );
}
        
    
export default Routes