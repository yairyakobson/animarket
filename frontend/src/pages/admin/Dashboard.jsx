import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useLazyGetDashboardSalesQuery } from "../../redux/services/orderApi";
import AdminSidebar from "../../components/storeComponents/AdminSidebar";
import SalesChart from "../../components/storeComponents/SalesChart";
import MetaData from "../../components/MetaData";

const Dashboard = () =>{
  const [, setForceUpdate] = useState(false);
  const startDateRef = useRef(new Date().setDate(1));
  const endDateRef = useRef(new Date());

  const [getDashboardSales, { error, data }] = useLazyGetDashboardSalesQuery();

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }

    if(startDateRef.current && endDateRef.current && !data){
      getDashboardSales({
        startDate: new Date(startDateRef.current).toISOString(),
        endDate: endDateRef.current.toISOString()
      });
    }
  }, [data, error, getDashboardSales]);

  const salesHandler = () =>{
    getDashboardSales({
      startDate: new Date(startDateRef.current).toISOString(),
      endDate: endDateRef.current.toISOString()
    });
  }

  // Function to trigger component re-render
  const triggerRender = () => setForceUpdate((prev) => !prev);

  return(
    <AdminSidebar>
      <MetaData title={"Admin Dashboard"}/>
      <section className="d-md-flex d-lg-flex justify-content-start align-items-center">
        <section className="mb-2 me-4">
          <DatePicker
          className="mt-2 mt-md-3 mt-lg-0"
          dateFormat={"MMMM dd, yyyy"}
          selected={startDateRef.current}
          onChange={(date) => {
            startDateRef.current = date;
            triggerRender(); // Trigger a re-render when date changes
          }}
          selectsStart
          startDate={startDateRef.current}
          endDate={endDateRef.current}/>
        </section>
        <section className="mb-2">
          <DatePicker
          className="mt-2 mt-md-3 mt-lg-0"
          dateFormat={"MMMM dd, yyyy"}
          selected={endDateRef.current}
          onChange={(date) => {
            endDateRef.current = date;
            triggerRender(); // Trigger a re-render when date changes
          }}
          selectsEnd
          startDate={startDateRef.current}
          endDate={endDateRef.current}
          minDate={startDateRef.current}/>
        </section>

        <Button variant="danger" className="mt-2 mt-md-2 mt-lg-0 ms-md-4 ms-lg-4"
        onClick={salesHandler}>Fetch</Button>
      </section>

      <Row as="section" className="my-5">
        <Col as="section" xl={6} className="col-6 mb-3">
          <Card className="text-white bg-success o-hidden h-100">
            <Card.Body>
              <Card.Title className="text-center">Sales
              <br/>
              <b>${data?.totalSales.toFixed(2)}</b>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col as="section" xl={6} className="col-6 mb-3">
          <Card className="text-white bg-danger o-hidden h-100">
            <Card.Body>
              <Card.Title className="text-center">Orders
              <br/>
              <b>{data?.totalNumOrders}</b>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <SalesChart salesData={data?.sales}/>
    </AdminSidebar>
  )
}

export default Dashboard;