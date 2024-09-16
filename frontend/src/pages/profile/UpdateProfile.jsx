import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "sonner";

import { useGetCurrentUserQuery, useUpdateProfileMutation } from "../../redux/services/userApi";
import { useOptimisticUpdate } from "../../hooks/useOptimisticUpdate";

import profilepic from "../../assets/add.png";
import MetaData from "../../components/MetaData";
import UserSidebar from "../../components/storeComponents/UserSidebar";

const UpdateProfile = () =>{
  const updateUserRef = useRef({
    name: "",
    email: ""
  });
  const [imageData, setImageData] = useState({
    img: "",
    imgPreview: profilepic,
    updatedImg: false,
  });
  const { img, imgPreview, updatedImg } = imageData;

  const theme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const { refetch: refetchUser } = useGetCurrentUserQuery();
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  const navigate = useNavigate();

  const { optimisticUser, handleOptimisticUpdate, isPending } = useOptimisticUpdate(
    updateProfile,
    refetchUser
  );

  const validateImage = (e) =>{
    const reader = new FileReader();

    reader.onload = () =>{
      if(reader.readyState === 2){
        setImageData((prevState) =>({
          ...prevState,
          img: reader.result,
          updatedImg: reader.result,
        }));
      }
    };
    reader.readAsDataURL(e.target.files[0]);;
  }

  useEffect(() =>{
    if(user){
      updateUserRef.current.name = user?.name;
      updateUserRef.current.email = user?.email;
      setImageData((prevState) =>({
        ...prevState,
        imgPreview: user?.picture?.url,
      }));
    }
  },[user]);

  useEffect(() =>{
    if(optimisticUser){
      updateUserRef.current.name = optimisticUser?.name;
      updateUserRef.current.email = optimisticUser?.email;
      setImageData((prevState) =>({
        ...prevState,
        imgPreview: optimisticUser?.picture?.url,
      }));
    }
  },[optimisticUser]);

  const handleUpdate = async(e) =>{
    e.preventDefault();
    const data = {
      name: updateUserRef.current.name,
      email: updateUserRef.current.email,
      picture: img
    }
    try{
      await handleOptimisticUpdate(data, user, imgPreview, () => {
        toast.success("User Updated");
        navigate("/profile/my_profile");
      });
    }
    catch(error){
      toast.error(error?.data?.message);
    }
  }

  return(
    <>
      <MetaData title={"Update Your Profile"}/>
      <UserSidebar>
        <Row as="section">
          <Col as="section">
            <Form onSubmit={handleUpdate} className={`${theme ? "" : "dark"}`}>
              <section className="reg-profile-pic_container">
                <img src={updatedImg || imgPreview} alt="" className="reg-profile-pic mt-2"/>
                <label htmlFor="image-upload" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"/>
                </label>
                <input type="file" id="image-upload"
                hidden
                onChange={validateImage}/>
              </section>

              {error && <Alert className="alert-danger" style={{ marginTop: 25 }}>{error?.data?.message}</Alert>}
              <FloatingLabel className="mt-5" data-bs-theme={theme ? "light" : "dark"} label="Name">
                <Form.Control type="text"
                name="name"
                placeholder="Name"
                defaultValue={updateUserRef.current.name}
                onChange={(e) => updateUserRef.current.name = e.target.value}/>
              </FloatingLabel>

              <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Email address">
                <Form.Control type="email"
                name="email"
                placeholder="Email Address"
                defaultValue={updateUserRef.current.email}
                onChange={(e) => updateUserRef.current.email = e.target.value}/>
              </FloatingLabel>

              <Button type="submit" className="btn-danger mt-5"
              disabled={isLoading || isPending}>{isLoading ? "Updating..." : "Update"}</Button>
            </Form>
          </Col>
        </Row>
      </UserSidebar>
    </>
  )
}

export default UpdateProfile;
