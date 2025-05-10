import React from 'react';
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const myRouter = createBrowserRouter([
    {path:'',Component:Login},
    {path:'login',Component:Login},
    {path:'signup',Component:Signup},
    {path:'dashboard',Component:Dashboard}
  ])
  return (
    <>
      <RouterProvider router={myRouter}/>
      <ToastContainer />
    </>
  )
}

export default App
