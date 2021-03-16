import React, { useState, useEffect } from 'react';
import Auth from './pages/auth';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './utils/contexts';
import { isUserLogedApi } from './api/auth';
import Routing from './routes/Routing';

export default function App() {
  //Use state para los estados de la aplicacion
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLogedApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);  //el estado que cambiara de pagina
  }, [refreshCheckLogin]);
  
  if (!loadUser) return false;


 return (
   <AuthContext.Provider value={user}>

     {user ? (<Routing />) : (<Auth setRefreshCheckLogin={setRefreshCheckLogin}/>)} 

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
   </AuthContext.Provider>
 )
}
