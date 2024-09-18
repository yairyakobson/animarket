import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IoMdPrint } from "react-icons/io";
import { toast } from "sonner";

import { useOrderDetailsQuery, useUpdateOrderMutation } from "../../redux/services/orderApi";
import { ORDER_OPTIONS } from "../../constants/productConstants";
import AdminSidebar from "../../components/storeComponents/AdminSidebar";
import MetaData from "../../components/MetaData";
import OrderDetails from "../../components/OrderDetails";

const UpdateOrder = () =>{
  const [status, setStatus] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme);

  const { data } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation();

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
  } = order;

  const isPaid = paymentInfo?.status === "paid" ? true : false;

  useEffect(() =>{
    if(orderStatus){
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("Order Updated");
      navigate("/admin/orders")
    }
  }, [error, isSuccess, navigate])

  const updateOrderHandler = (id) =>{
    const data = { status };
    updateOrder({ id, body: data })
  };

  return(
    <AdminSidebar>
    <MetaData title={`Process Order ${order?._id}`}/>
      <Row as="section" className="d-flex justify-content-around">
        <Col as="section" lg={9} className="col-12">
          <OrderDetails
          shippingInfo={shippingInfo}
          orderItems={orderItems}
          user={user}
          order={order}
          itemsPrice={itemsPrice}
          taxPrice={taxPrice}
          shippingPrice={shippingPrice}
          totalPrice={totalPrice}
          paymentInfo={paymentInfo}
          orderStatus={orderStatus}
          isPaid={isPaid}/>
        </Col>

        <Col as="section" lg={3} className="col-12 mt-3">
          {order?.orderStatus !== "Delivered" && (
            <>
              <h4 className="my-2">Status</h4>
              <section className="mb-3">
                <Form.Select data-bs-theme={theme ? "light" : "dark"}
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                {ORDER_OPTIONS.map((option) =>(
                  <option key={option} value={option}>{option}</option>
                ))}
                </Form.Select>
              </section>

              <Button className="btn-danger"
              onClick={() => updateOrderHandler(order?._id)}
              disabled={status === order.orderStatus}>Update Status</Button>
            </>
          )}
          <br/>
          <Link to={`/invoice/order/${order?._id}`}
          className="btn btn-success mt-3"
          style={{ color: theme ? "black" : "whitesmoke"}}>
            <IoMdPrint className="invoice-icon"/>Generate Invoice
          </Link>
        </Col>
      </Row>
    </AdminSidebar>
  )
}

export default UpdateOrder;