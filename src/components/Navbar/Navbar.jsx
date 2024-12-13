import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <nav className='bg-info py-3 fixed-top'>
        <div className="container d-flex align-items-center justify-content-between">
          <div className='d-flex align-items-center gap-2'>
            <i className="fa-regular fa-note-sticky text-dark fs-2"></i>
            <h2 className='text-dark'>Notes</h2>
          </div>

          <ul className='list-unstyled d-flex gap-3'>
            <li>
              <Link to={'/'} className='text-dark text-decoration-none fs-5'>Login</Link>
            </li>
            <li>
            <Link to={'/register'} className='text-dark text-decoration-none fs-5'>Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
