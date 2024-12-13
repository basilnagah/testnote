import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/register/Register'
import Layout from './components/Layout/Layout'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import ProtetctedRoute from './components/ProtetctedRoute/ProtetctedRoute'
import UserProvider from './context/user.context'

function App() {

  const routes = createBrowserRouter([
    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'home', element: <ProtetctedRoute> <Home /></ProtetctedRoute> },
      ]
    },
  ])


  return (
    <>
      <UserProvider>
        <RouterProvider router={routes}></RouterProvider>
      </UserProvider>

    </>
  )
}

export default App
