import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import { calculateOrderCost } from "../../../components/storeComponents/PriceHelper"
import Checkout from "./Checkout";
import MetaData from "../../../components/MetaData";

import "../../styles/OrderStyle.css";

const ConfirmOrder = () =>{
  const theme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const { cart, shippingInfo } = useSelector((state) => state.cart);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateOrderCost(cart);
  
  return(
    <>
      <MetaData title={"Confirm Order Info"}/>
      <Checkout shipping confirmOrder/>
      <Container as="section" className={`${theme ? "shadow-lg" : "dark"}`}>
        <Row as="section">
          <Col as="section" lg={9} className="mt-3 order-confirm">
            <h4>Shipping Info</h4>
            <p className="mt-3">
              <b>Name:</b> {user?.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo?.phoneNumber}
            </p>
            <p className="mb-4">
              <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
              {shippingInfo?.country}, {shippingInfo?.zipCode}
            </p>
            <hr/>
            <h4 className="mt-4">Your Cart Items:</h4>
            {cart?.map((item) =>(
              <Fragment key={item?.name}>
                <hr/>
                <section className="my-1">
                  <Row as="section">
                    <Col as="section" md={3} lg={2} className="col-4">
                      <img src={item?.image} alt={item?.name}
                      height="100"
                      width="100"/>
                    </Col>

                    <Col as="section" lg={6} className="col-5 mt-3 mt-lg-0">
                      <Link to={`/product/${item.product}`}
                      style={{ color: theme ? "black" : "whitesmoke", textDecoration: "none"}}>{item?.name}</Link>
                    </Col>

                    <Col as="section" lg={4} className="col-3 mt-3 mt-lg-0">
                      <p>
                        {item?.quantity} x ${item?.price} ={" "}
                        <b>${(item?.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </Col>
                  </Row>
                </section>
                <hr/>
              </Fragment>
            ))}
          </Col>

          <Col as="section" lg={3} md={12} className="col-12 my-4">
            <section id="order_summary">
              <h4>Order Summary</h4>
              <hr/>
              <p>Subtotal: <span className="order-summary-values">${itemsPrice}</span></p>
              <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
              <p>Tax: <span className="order-summary-values">${taxPrice}</span></p>
              <p>Total: <span className="order-summary-values">${totalPrice}</span></p>
              <hr/>
              <Link to="/payment_method" id="checkout_btn" className="btn btn-danger w-100">Proceed to Payment</Link>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ConfirmOrder;