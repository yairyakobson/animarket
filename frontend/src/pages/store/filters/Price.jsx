import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";

import { getPriceQueryParams } from "../../../components/storeComponents/PriceHelper";

const Price = () => {
  const priceRef = useRef({
    min: "",
    max: ""
  });

  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);
  
  let [searchParams] = useSearchParams();

  const priceRangeHandler = (e) => {
    e.preventDefault();
    
    const min = priceRef.current.min.value;
    const max = priceRef.current.max.value;

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  return (
    <>
      <h4 className="mx-auto">Price</h4>
      <Form onSubmit={priceRangeHandler} className="p-0">
        <Row as="section">
          <Col as="section" md={3} lg={4} className="col-5">
            <Form.Control
              type="text"
              className="mt-1"
              data-bs-theme={theme ? "light" : "dark"}
              placeholder="Min"
              name="min"
              ref={(el) => (priceRef.current.min = el)}
            />
          </Col>

          <br />
          <Col as="section" md={3} lg={4} className="col-5">
            <Form.Control
              type="text"
              className="mt-1"
              data-bs-theme={theme ? "light" : "dark"}
              placeholder="Max"
              name="max"
              ref={(el) => (priceRef.current.max = el)}
            />
          </Col>

          <Col as="section" className="col-2">
            <Button type="submit" className="btn-danger mt-1">Filter</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Price;