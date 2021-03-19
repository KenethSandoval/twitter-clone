import Home from '../pages/Home';
import User from '../pages/User';
import Error404 from '../pages/Error404';

export default [
  {
    path: "/",
    exact: true,
    page: Home
  }, 
  {
    path:"/:id",
    page: User
  },
  {
    path: "*",
    page: Error404
  }
];
