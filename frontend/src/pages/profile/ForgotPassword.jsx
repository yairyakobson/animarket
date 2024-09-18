import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { useForgotPasswordMutation } from "../../redux/services/userApi";
import MetaData from "../../components/MetaData";

const ForgotPassword = () =>{
  const emailRef = useRef("");

  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [forgotPassword, { error, isLoading, isSuccess }] = useForgotPasswordMutation();

  useEffect(() =>{
    if(isAuthenticated){
      navigate("/");
    }
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success(`Email sent. Check your inbox`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error, isSuccess]);

  const handleForgotPassword = (e) =>{
    e.preventDefault();
    const email = emailRef.current.value;
    forgotPassword({ email });
  };
  
  return(
    <>
      <MetaData title={"Forgot password"}/>
      <Container as="section" className="d-flex justify-content-center align-items-center">
        <Row as="section">
          <Col as="section" className="shadow-lg mt-5">
            <Form onSubmit={handleForgotPassword} className={`${theme ? "" : "dark"}`}>

            <FloatingLabel data-bs-theme={theme ? "light" : "dark"} label="Email address">
              <Form.Control type="email"
              name="email"
              placeholder="Email Address"
              ref={emailRef}/>
            </FloatingLabel>

            <Button type="submit" className="btn-danger mt-4"
            disabled={isLoading}>{isLoading ? "Sending" : "Send"}</Button>

            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ForgotPassword;