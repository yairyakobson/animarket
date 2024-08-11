import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Search = () =>{
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const hiddenCondition = useMemo(() =>(
    location.pathname.match("/register") ||
    location.pathname.match("/login") ||
    location.pathname.match("/password/forgotpassword")
  ), [location.pathname]);

  const searchHandler = (e) =>{
    e.preventDefault();

    if(keyword?.trim()){
      navigate(`/search/?keyword=${keyword}`);
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
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
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