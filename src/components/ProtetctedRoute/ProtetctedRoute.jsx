import React, { useContext } from 'react'
import { userContext } from '../../context/user.context'
import { Navigate } from 'react-router-dom'

export default function ProtetctedRoute({ children }) {
    const { token, setToken } = useContext(userContext)

    if(token!=null){
        return children
    }else{
        return <Navigate to={'/'}/>
    }
}
