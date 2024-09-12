import { useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Search = () =>{
  const keywordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const hiddenCondition = useMemo(() =>(
    location.pathname.match("/register") ||
    location.pathname.match("/login") ||
    location.pathname.match("/password/forgotpassword")
  ), [location.pathname]);

  const searchHandler = (e) =>{
    e.preventDefault();

    if(keywordRef.current?.trim()){
      navigate(`/search/?keyword=${keywordRef.current}`);
    }
    else{
      navigate("/");
    }
  }

  return(
    <Form onSubmit={searchHandler}>
      <InputGroup as="section">
        <Form.Control type="text" id="search_field" className="border-0"
        placeholder="Search"
        onChange={(e) => (keywordRef.current = e.target.value)}
        hidden={hiddenCondition}/>
        <section>
          <Button className="border-danger btn-danger" onClick={searchHandler}
          hidden={hiddenCondition}>
            <FaSearch aria-hidden="true" className="icon"/>
          </Button>
        </section>
      </InputGroup>
    </Form>
  )
}

export default Search;