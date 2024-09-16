import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { countries } from "countries-list";

import { saveShippingInfo } from "../../../redux/features/cartSlice";
import Checkout from "./Checkout";
import MetaData from "../../../components/MetaData";

const Shipping = () =>{
  const shippingRef = useRef({
    address: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    country: "",
  });
  const [, forceRender] = useState(0);
  console.log(shippingRef.current);

  const countriesList = Object.values(countries);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme);

  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() =>{
    if(shippingInfo){
      shippingRef.current.address = shippingInfo?.address || "";
      shippingRef.current.city = shippingInfo?.city || "";
      shippingRef.current.zipCode = shippingInfo?.zipCode || "";
      shippingRef.current.phoneNumber = shippingInfo?.phoneNumber || "";
      shippingRef.current.country = shippingInfo?.country || "";
      forceRender((prev) => prev + 1); // Force a re-render to reflect the changes in the form
    }
  }, [shippingInfo]);

  const shippingHandler = (e) =>{
    e.preventDefault();
    dispatch(saveShippingInfo(shippingRef.current));
    navigate("/order/confirm");
  }

  const handleChange = (field) => (e) =>{
    shippingRef.current[field] = e.target.value;
  };

  return(
    <>
      <MetaData title={"Shipment Information"}/>
      <Checkout shipping/>
        <Container as="section">
          <Row as="section" className="d-flex justify-content-center align-items-center mb-5">
            <Col as="section" lg={5} className={`col-10 ${theme ? "shadow-lg" : ""}`}>
              <Form onSubmit={shippingHandler} className={`${theme ? "" : "dark"}`}>
                <h1 className="mt-4 text-center">Shipping Information</h1>
                <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Address">
                  <Form.Control type="text"
                  placeholder="Address"
                  value={shippingRef.current.address}
                  onChange={handleChange("address")}/>
                </FloatingLabel>

                <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="City">
                  <Form.Control type="text"
                  placeholder="City"
                  value={shippingRef.current.city}
                  onChange={handleChange("city")}/>
                </FloatingLabel>

                <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Zip Code">
                  <Form.Control type="number"
                  placeholder="Zip Code"
                  value={shippingRef.current.zipCode}
                  onChange={handleChange("zipCode")}/>
                </FloatingLabel>

                <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Phone Number">
                  <Form.Control type="number"
                  placeholder="Phone Number"
                  value={shippingRef.current.phoneNumber}
                  onChange={handleChange("phoneNumber")}/>
                </FloatingLabel>

                <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Country">
                  <Form.Select
                  name="country"
                  value={shippingRef.current.country}
                  onChange={handleChange("country")}>
                  {countriesList?.map((country) => (
                    <option key={country?.name} value={country?.name}>{country?.name}</option>
                  ))}
                  </Form.Select>
                </FloatingLabel>

                <Button type="submit"
                className="btn-block btn-danger mt-4 py-2 col-sm-4 col-md-3">Confirm</Button>
              </Form>
            </Col>
          </Row>
        </Container>
    </>
  )
}

export default Shipping;