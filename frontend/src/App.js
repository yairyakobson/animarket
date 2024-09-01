import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";

import Footer from "./components/Footer";
import Header from "./components/headers/Header";
import NotFound from "./pages/NotFound";

import useMainRoutes from "./hooks/useMainRoutes";
import usePasswordRoutes from "./hooks/usePasswordRoutes";
import useProfileRoutes from "./hooks/useProfileRoutes";
import useOrderRoutes from "./hooks/useOrderRoutes";
import useAdminRoutes from "./hooks/useAdminRoutes";
import "./App.css";


function App(){
  const theme = useSelector((state) => state.theme);
  
  useEffect(() =>{
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = theme ? "white" : "black";
  });

  const passwordRoutes = usePasswordRoutes();
  const profileRoutes = useProfileRoutes();
  const orderRoutes = useOrderRoutes();
  const adminRoutes = useAdminRoutes();
  const mainRoutes = useMainRoutes();

  return(
    <>
      <Router>
        <section className="d-flex flex-column min-vh-100">
        <Header/>
          <Routes>
            {mainRoutes}
            {passwordRoutes}
            {profileRoutes}
            {orderRoutes}
            {adminRoutes}
            <Route path="*" element={<NotFound/>}/>
          </Routes>
          <Toaster richColors position="top-center"/>
        <Footer/>
        </section>
      </Router>
    </>
  );
}

export default App;