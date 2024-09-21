import React from 'react';
import { useLocation,Navigate } from "react-router-dom";

export const setToken = (token)=>{

    localStorage.setItem('temitope', token)// make up your own token
}

export const fetchToken = () =>{

    return localStorage.getItem('temitope')
}

export function RequireToken({children}){

    let auth = fetchToken()
    let location = useLocation()

    if(!auth){
        return <Navigate to='/login' state ={{from : location}}/>;
    }

    return children;
}


export const setUser = (user)=>{

    localStorage.setItem('user', JSON.stringify(user))// make up your own token
}

export const fetchUser = ()=>{

    return JSON.parse(localStorage.getItem('user'))
}