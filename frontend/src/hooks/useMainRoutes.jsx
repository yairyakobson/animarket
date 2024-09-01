import { Route } from "react-router-dom";

import Store from "../pages/store/Store";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProductDetails from "../pages/store/ProductDetails";

const useMainRoutes = () =>{
  return(
    <>
      <Route path="/" element={<Store/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/search" element={<Store/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>
    </>
  )
}

export default useMainRoutes;