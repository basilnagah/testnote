import React, { createContext, useState } from 'react'

export const userContext = createContext('')

export default function UserProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('usertoken'))


    return <userContext.Provider value={{token , setToken}}> {children} </userContext.Provider>
}
