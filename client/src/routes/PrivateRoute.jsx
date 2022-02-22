import React from 'react'
import {Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, account ,...rest}) => {

    const token = localStorage.getItem('token');
    
    return (
        token ? 
        <Component account={account} {...rest}/>:
        <Redirect to="/"/>
    )
}

export default PrivateRoute
