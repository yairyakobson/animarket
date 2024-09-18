import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { useUpdatePasswordMutation } from "../../redux/services/userApi";
import MetaData from "../../components/MetaData";
import UserSidebar from "../../components/storeComponents/UserSidebar";

const UpdatePassword = () =>{
  const oldPasswordRef = useRef("");
  const newPasswordRef = useRef("");

  const theme = useSelector((state) => state.theme);
  const [updatePassword, { isLoading, error, isSuccess }] = useUpdatePasswordMutation();

  const navigate = useNavigate();

  useEffect(() =>{
    if(isSuccess){
      toast.success("Password Updated");
      navigate("/profile/my_profile");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handlePasswordUpdate = (e) =>{
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    const data = { oldPassword: oldPassword, newPassword: newPassword };
    updatePassword(data);
  }

  return(
    <>
      <MetaData title={"Update Your Password"}/>
      <UserSidebar>
        <Row as="section">
          <Col as="section">
            <Form onSubmit={handlePasswordUpdate} className={`${theme ? "" : "dark"}`}>
              {error && <Alert className="alert-danger" style={{ marginTop: 25 }}>{error?.data?.message}</Alert>}
              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Old Password">
                <Form.Control type="password"
                name="password"
                placeholder="Password"
                ref={oldPasswordRef}/>
              </FloatingLabel>
                    
              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="New Password">
                <Form.Control type="password"
                name="password"
                placeholder="Password"
                ref={newPasswordRef}/>
              </FloatingLabel>

              <Button type="submit" className="btn-danger mt-3"
              disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</Button>
            </Form>
          </Col>
        </Row>
      </UserSidebar>
    </>
  )
}

export default UpdatePassword;