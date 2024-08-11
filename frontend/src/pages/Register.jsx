import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Button, Container, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { useRegUserMutation } from "../redux/services/authApi";
import MetaData from "../components/MetaData";
import profilepic from "../assets/add.png";
import "./styles/RegisterStyle.css";

const Register = () =>{
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = data
  const [img, setImg] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  
  const navigate = useNavigate();
  
  const theme = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [regUser, { error, isLoading }] = useRegUserMutation();

  const dataHandler = (e) =>{
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const validateImage = (e) =>{
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("file", img);

    reader.onload = () =>{
      if(reader.readyState === 2){
        setImgPreview(reader.result);
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  useEffect(() =>{
    if(isAuthenticated){
      toast.error("You Are Already Logged In.");
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleRegister = (e) =>{
    e.preventDefault();
    toast.loading("Loading...");

    const data = { name, email, password, picture: img }
    regUser(data)
    .then(({ data }) =>{
      if(data){
        toast.success("Welcome New User");
        navigate("/");
        toast.dismiss();
      }
    })
    .finally(() =>{
      toast.dismiss();
    });
  }

  return(
    <>
      <MetaData title={"Register"}/>
      <Container as="section" className="d-flex justify-content-center align-items-center mt-5">
        <Row as="section">
          <Col as="section" className={`${theme ? "shadow-lg" : ""}`}>
            <Form onSubmit={handleRegister} className={`${theme ? "" : "dark"}`}>
            <h1 className="mt-4 text-center">Register</h1>
              <section className="reg-profile-pic_container">
                <img src={ imgPreview || profilepic } alt="" className="reg-profile-pic mt-2"/>
                <label htmlFor="image-upload" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"/>
                </label>
                <input type="file" id="image-upload"
                accept="images/*"
                hidden
                onChange={validateImage}/>
              </section>

            {error && <Alert className="alert-danger" style={{ marginTop: 25 }}>{error?.data?.message}</Alert>}
            <FloatingLabel className="mt-5" data-bs-theme={theme ? "light" : "dark"} label="Name">
              <Form.Control type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={dataHandler}/>
            </FloatingLabel>

            <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Email address">
              <Form.Control type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={dataHandler}/>
            </FloatingLabel>

            <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Password">
              <Form.Control type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={dataHandler}/>
            </FloatingLabel>

            <Button type="submit" className="btn-danger mt-5"
            disabled={isLoading || password.length < 8}>Register</Button>
            <section className="py-4">
              <p className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </section>
           </Form>
         </Col>
        </Row>
      </Container>
      <section className="mb-5"/>
    </>
  )
}

export default Register;