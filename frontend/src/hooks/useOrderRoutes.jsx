import { Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import Cart from "../pages/store/cart/Cart";
import Shipping from "../pages/store/cart/Shipping";
import ConfirmOrder from "../pages/store/cart/ConfirmOrder";
import Payment from "../pages/store/cart/Payment";
import Invoice from "../pages/orders/Invoice";

const useOrderRoutes = () =>{
  return(
    <>
      <Route path="/cart" element={
      <ProtectedRoute>
        <Cart/>
      </ProtectedRoute>}/>

      <Route path="/shipping" element={
      <ProtectedRoute>
        <Shipping/>
      </ProtectedRoute>}/>

      <Route path="/order/confirm" element={
      <ProtectedRoute>
        <ConfirmOrder/>
      </ProtectedRoute>}/>

      <Route path="/payment_method" element={
      <ProtectedRoute>
        <Payment/>
      </ProtectedRoute>}/>

      <Route path="/invoice/order/:id" element={
      <ProtectedRoute>
        <Invoice/>
      </ProtectedRoute>}/>
    </>
  )
}

export default useOrderRoutes;