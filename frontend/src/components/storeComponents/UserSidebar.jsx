import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";

import SidebarConfig from "./SidebarConfig";

const UserSidebar = ({ children }) =>{
  const theme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);

  const menuItems =[
    {
      name: "Profile",
      url: "/profile/my_profile",
      icon: "fas fa-user",
    },
    {
      name: "Update Profile",
      url: "/profile/update_profile",
      icon: "fas fa-user",
    },
    {
      name: "Update Password",
      url: "/profile/update_password",
      icon: "fas fa-lock",
    },
    {
      name: "New Product",
      url: "/profile/new_product",
      icon: "fas fa-plus-circle",
    },
  ];

  return(
    <section>
      <section className="mt-2 py-4">
        <h2 className="text-center fw-bolder" style={{ color: theme ? "black" : "whitesmoke" }}>{`${user?.name}'s Sidebar`}</h2>
      </section>

      <Container as="section">
        <Row as="section" className={`justify-content-around ${theme ? "" : "dark"}`}>
          <Col as="section" lg={3} className="col-12">
            <SidebarConfig menuItems={menuItems}/>
          </Col>
          <Col as="section" lg={9} className="col-9 my-2">{children}</Col>
        </Row>
      </Container>
    </section>
  );
};

export default UserSidebar;