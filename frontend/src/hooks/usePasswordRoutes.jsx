import { Route } from "react-router-dom";

import ForgotPassword from "../pages/profile/ForgotPassword";
import ResetPassword from "../pages/profile/ResetPassword";

const usePasswordRoutes = () =>{
  return(
    <>
      <Route path="/password/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/password/reset/:token" element={<ResetPassword/>}/>
    </>
  )
}

export default usePasswordRoutes;