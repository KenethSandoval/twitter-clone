import React, { useState } from 'react';
import Auth from './pages/auth';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const [user, setUser] = useState(null);

 return (
   <div>

   {user? 
     (<h1>Estas logeado</h1>) 
     :(
        <Auth />
     )} 

    <ToastContainer
       position="top-right"
       autoClose={5000}
       hideProgressBar
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnVisibilityChange
       draggable
       pauseOnHover
    />
   </div>
 )
}
