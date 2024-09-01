import { useSelector } from "react-redux";
import { Container, Col, Nav, Navbar } from "react-bootstrap";

import { useGetCurrentUserQuery } from "../../redux/services/userApi";
import { ThemeToggle } from "../ThemeToggle";
import logo from "../../assets/Logo.png"
import Search from "../storeComponents/Search";

const MainHeader = () =>{
  const theme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  
  const { isLoading } = useGetCurrentUserQuery();

  return(
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container as="section">
        <Navbar.Brand href="/">
          <img src={logo} alt="Home"/>
        </Navbar.Brand>

        <Col as="section" md={4} lg={user ? 7 : 6}>
          <Search/>
        </Col>

        <ThemeToggle isChecked={theme ? false : true}/>

        <Navbar.Toggle/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {!isLoading &&
            <>
              <Nav.Link href="/register" hidden={user}>Register</Nav.Link>
              <Nav.Link href="/login" hidden={user}>Login</Nav.Link>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default MainHeader;