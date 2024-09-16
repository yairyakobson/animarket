import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { useResetPasswordMutation } from "../../redux/services/userApi";
import MetaData from "../../components/MetaData";

const ResetPassword = () =>{
  const newPasswordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const navigate = useNavigate();
  const params = useParams();

  const theme = useSelector((state) => state.theme);
  const [resetPassword, { error, isLoading, isSuccess }] = useResetPasswordMutation();

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("Password Resetted Successfully");
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error, isSuccess]);

  const handleResetPassword = (e) =>{
    e.preventDefault();

    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if(newPassword !== confirmPassword){
      return toast.error("Password doesn't match. Try again");
    }
    const data = { password: newPassword, confirmPassword: confirmPassword };
    resetPassword({ token: params?.token, body: data });
  };
  return(
    <>
      <MetaData title={"Reset password"}/>
      <Container as="section" className="d-flex justify-content-center align-items-center">
        <Row as="section">
          <Col as="section" className="shadow-lg mt-5">
            <Form onSubmit={handleResetPassword} className={`${theme ? "" : "dark"}`}>
            <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="New Password">
              <Form.Control type="password"
              name="password"
              placeholder="New Password"
              ref={newPasswordRef}/>
            </FloatingLabel>

            <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Confirm Password">
              <Form.Control type="password"
              name="password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}/>
            </FloatingLabel>

              <Button type="submit" className="btn-danger mt-3"
              disabled={isLoading}>{isLoading ? "Resetting" : "Reset"}</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ResetPassword;