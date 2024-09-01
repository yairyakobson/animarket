import { Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import UpdateProduct from "../pages/admin/UpdateProduct";
import OrderList from "../pages/admin/OrderList";
import UpdateOrder from "../pages/admin/UpdateOrder";
import Users from "../pages/admin/Users";
import UpdateUser from "../pages/admin/UpdateUser";
import Reviews from "../pages/admin/Reviews";

const useAdminRoutes = () =>{
  return(
    <>
      <Route path="/admin/dashboard" element={
      <ProtectedRoute admin={true}>
        <Dashboard/>
      </ProtectedRoute>}/>

      <Route path="/admin/products" element={
      <ProtectedRoute admin={true}>
        <Products/>
      </ProtectedRoute>}/>

      <Route path="/admin/product/:id/edit" element={
      <ProtectedRoute admin={true}>
        <UpdateProduct/>
      </ProtectedRoute>}/>

      <Route path="/admin/orders" element={
      <ProtectedRoute admin={true}>
        <OrderList/>
      </ProtectedRoute>}/>

      <Route path="/admin/order/:id/edit" element={
      <ProtectedRoute admin={true}>
        <UpdateOrder/>
      </ProtectedRoute>}/>

      <Route path="/admin/users" element={
      <ProtectedRoute admin={true}>
        <Users/>
      </ProtectedRoute>}/>

      <Route path="/admin/user/:id/edit" element={
      <ProtectedRoute admin={true}>
        <UpdateUser/>
      </ProtectedRoute>}/>

      <Route path="/admin/reviews" element={
      <ProtectedRoute admin={true}>
        <Reviews/>
      </ProtectedRoute>}/>
    </>
  )
}

export default useAdminRoutes;