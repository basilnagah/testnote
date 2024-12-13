import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <Navbar />
            <div className='bg-body-secondary vh-100 pt-5'>
                <div className='pt-4'>

                <Outlet />
                </div>
            </div>
        </>
    )
}
