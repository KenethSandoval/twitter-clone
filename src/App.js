import React, { useState } from 'react';
import Auth from './pages/auth';

export default function App() {
  const [user, setUser] = useState(null);

 return (
   <div>
   {user? 
     (<h1>Estas logeado</h1>) 
     :(
        <Auth />
     )} 

   </div>
 )
}
