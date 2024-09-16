import React from "react"
import { Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderDetails = ({
    shippingInfo,
    orderItems,
    user,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
    paymentInfo,
    order,
    isPaid
}) =>{
  const theme = useSelector((state) => state.theme);

  return(
    <>
      <h3 className="mb-2">Order Details</h3>
        <Table striped bordered
        variant={theme ? "light" : "dark"}>
          <tbody>
            <tr>
              <th scope="row">ID</th>
              <td>{order?._id}</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td>
                <b className={String(orderStatus).includes("Delivered") ? "greenColor" : "redColor"}>{orderStatus}</b>
              </td>
            </tr>
          </tbody>
        </Table>

          <h3 className="mt-3 mb-2">Shipping Info</h3>
          <Table striped bordered
          variant={theme ? "light" : "dark"}>
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Phone Number</th>
                <td>{shippingInfo?.phoneNumber}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>
                  {shippingInfo?.address}, {shippingInfo?.city},
                  {shippingInfo?.zipCode}, {shippingInfo?.country}
                </td>
              </tr>
            </tbody>
          </Table>

          <h3 className="mt-3 mb-2">Payment Info</h3>
          <Table striped bordered
          variant={theme ? "light" : "dark"}>
            <tbody>
              <tr>
                <th scope="row">Status</th>
                <td className={isPaid ? "greenColor" : "redColor"}>
                  <b>{paymentInfo?.status?.toUpperCase()}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Method</th>
                <td>{order?.paymentMethod}</td>
              </tr>
              <tr>
                <th scope="row">Payment ID</th>
                <td>{paymentInfo?.id || "Null"}</td>
              </tr>
              <tr>
                  <th scope="row">Price</th>
                  <td>${itemsPrice}</td>
                </tr>

                {shippingPrice ? (
                  <tr>
                    <th scope="row">Shipping</th>
                    <td>${shippingPrice}</td>
                  </tr>
                ) : null}
                
                <tr>
                  <th scope="row">Taxes</th>
                  <td>${taxPrice}</td>
                </tr>

                <tr>
                  <th scope="row">Total Price</th>
                  <td>${totalPrice}</td>
                </tr>
            </tbody>
          </Table>

          <h3 className="mt-3 my-2">Order Items:</h3>
          <hr/>
          <section className="my-1">
            {orderItems?.map((item) =>(
              <Row as="section" className="my-3" key={item?.name}>
                <Col as="section" md={3} lg={3} className="col-5">
                  <img src={item?.image} alt={item?.name}
                  height="150"
                  width="130"/>
                </Col>

                <Col as="section" md={5} lg={4} className="col-4">
                  <Link to={`/product/${item?.product}`}
                  style={{ color: theme ? "black" : "whitesmoke", textDecoration: "none"}}>{item?.name}</Link>
                </Col>

                <Col as="section" md={2} lg={2} className={`col-4 mt-4 mt-md-0 mt-lg-0 text-${theme ? "dark" : "light"} fs-4 fw-bold`}>
                  <p>${item?.price}</p>
                </Col>

                <Col as="section" md={2} lg={3} className={`col-4 mt-4 mt-md-1 mt-lg-1 text-${theme ? "dark" : "light"} fw-bold`}>
                  <p>x {item?.quantity}</p>
                </Col>
              </Row>
            ))}
          </section>
          <hr/>
    </>
  )
}

export default OrderDetails;