import { Route } from "react-router-dom";

import Profile from "../pages/profile/Profile";
import Orders from "../pages/orders/Orders";
import ProtectedRoute from "../components/ProtectedRoute";
import UpdateProfile from "../pages/profile/UpdateProfile";
import OrderDetails from "../pages/orders/OrderDetails";
import UpdatePassword from "../pages/profile/UpdatePassword";
import NewProduct from "../pages/profile/NewProduct";

const useProfileRoutes = () =>{
  return(
    <>
      <Route path="/profile/my_profile" element={
      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>}/>

      <Route path="/profile/update_profile" element={
      <ProtectedRoute>
        <UpdateProfile/>
      </ProtectedRoute>}/>

      <Route path="/profile/update_password" element={
      <ProtectedRoute>
        <UpdatePassword/>
      </ProtectedRoute>}/>

      <Route path="/profile/orders" element={
      <ProtectedRoute>
        <Orders/>
      </ProtectedRoute>}/>

      <Route path="/profile/orders/:id" element={
      <ProtectedRoute>
        <OrderDetails/>
      </ProtectedRoute>}/>

      <Route path="/profile/new_product" element={
      <ProtectedRoute>
        <NewProduct/>
      </ProtectedRoute>}/>
    </>
  )
}

export default useProfileRoutes;