import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Col, FloatingLabel, Form, Row, Alert } from "react-bootstrap";
import { toast } from "sonner";

import { useLogUserMutation } from "../redux/services/authApi";
import MetaData from "../components/MetaData";

const Login = () =>{
  const loginFormRef = useRef({
    email: "",
    password: ""
  });
  const { email, password } = loginFormRef.current;
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [logUser, { error, isLoading }] = useLogUserMutation();

  useEffect(() =>{
    if(isAuthenticated){
      toast.success(`Welcome Back ${user?.name}`, {
        duration: 1500
      });
      navigate("/");
      toast.dismiss();
    }
    else if(error){
      toast.dismiss();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleLogin = (e) =>{
    e.preventDefault();

    toast.loading("Loading...");
    logUser({ email: email.value, password: password.value })
    .unwrap()
    .catch(() =>{
      toast.dismiss();
    });
  }

  return(
    <>
      <MetaData title={"Login"}/>
      <Container as="section" className="d-flex justify-content-center align-items-center mt-5">
        <Row as="section">
          <Col as="section" className={`${theme ? "shadow-lg" : ""}`}>
            <Form onSubmit={handleLogin} className={`${theme ? "" : "dark"}`}>
              <h1 className="mt-4 text-center">Login</h1>
              {error && <Alert className="alert-danger" style={{ marginTop: 25 }}>{error?.data?.message}</Alert>}
              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Email address">
                <Form.Control type="email"
                name="email"
                placeholder="Email Address"
                ref={(email) => (loginFormRef.current.email = email)}/>
              </FloatingLabel>

              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Password">
                <Form.Control type="password"
                name="password"
                placeholder="Password"
                ref={(password) => (loginFormRef.current.password = password)}/>
              </FloatingLabel>

              <Button type="submit" className="btn-danger mt-3"
              disabled={isLoading}>Login</Button>

              <section className="py-4">
                <p className="text-center">
                  Don't have an account? <Link to="/register">Create one</Link>
                </p>
                <p className="text-center">
                  Forgot your password? <Link to="/password/forgotpassword">Click Here</Link>
                </p>
              </section>
            </Form>
          </Col>
        </Row>
      </Container>
      <section/>
    </>
  )
}

export default Login;