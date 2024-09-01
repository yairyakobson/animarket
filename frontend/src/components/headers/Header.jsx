import { useSelector } from "react-redux";

import MainHeader from "./MainHeader";
import UserHeader from "./UserHeader";
import Loader from "../Loader";

const Header = () =>{
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if(isLoading){
    return <Loader/>
  }

  return(
    <>
      {isAuthenticated ? (<UserHeader/>) : (<MainHeader/>)}
    </>
  )
}
export default Header;