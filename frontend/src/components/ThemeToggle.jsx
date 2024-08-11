import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../redux/features/themeSlice";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeToggle =() =>{
  const theme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const themeHandler = () =>{
    dispatch(toggleTheme());
  };

  return(
    <section>
      {theme ? 
      <FaSun color={!user ? "white" : ""} size="1.5rem"
      style={{ cursor: "pointer" }} className="justify-content-center sun"
      onClick={themeHandler}/> :
      <FaMoon color="white" size="1.5rem"
      style={{ cursor: "pointer" }} className="justify-content-center moon"
      onClick={themeHandler}/>}
    </section>
  )
}