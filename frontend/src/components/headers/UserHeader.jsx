import { useSelector } from "react-redux";
import { Button, Container, Col, Nav, Navbar, Offcanvas } from "react-bootstrap";

import { useLazyLogoutUserQuery } from "../../redux/services/authApi";
import { ThemeToggle } from "../ThemeToggle";
import logo from "../../assets/Logo.png"
import Search from "../storeComponents/Search";

const UserHeader = () =>{
  const theme = useSelector((state) => state.theme);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [logoutUser] = useLazyLogoutUserQuery();

  async function handleLogout(e){
    e.preventDefault();
    await logoutUser(user);
    window.location.replace("/");
  }

  return(
    <Navbar bg="dark" variant="dark" expand={user && false}>
      <Container as="section">
        <Navbar.Brand href="/">
          <img src={logo} alt="Home"/>
        </Navbar.Brand>

        <Col as="section" md={4} lg={user ? 7 : 6}>
          <Search/>
        </Col>

        <Nav.Link href="/cart" disabled={cart?.length === 0}>
          {<i className="fa-solid fa-cart-shopping mt-2 mt-md-2 text-light">
          {<span id="cart" className="mx-2">{cart?.length}</span>}</i>}
        </Nav.Link>
        <Navbar.Toggle style={{ color: "transparent" }}/>

        <Navbar.Offcanvas placement="end" data-bs-theme={theme ? "light" : "dark"}>
          <Offcanvas.Header closeButton>
            <img src={user?.picture?.url} alt={user?.name} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "50%" }}/>
            <Navbar.Text className="mx-3"><b>{user?.name}</b></Navbar.Text>
            <ThemeToggle isChecked={theme ? false : true}/>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav>
              <Nav.Link href="/profile/my_profile">My Account</Nav.Link>
              <Nav.Link href="/profile/orders">My Orders</Nav.Link>
              {user?.role === "Admin" &&
                <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
              }
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
export default UserHeader;