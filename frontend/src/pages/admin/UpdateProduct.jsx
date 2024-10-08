import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

import { useGetProductDetailsQuery, useUpdateProductMutation } from "../../redux/services/productApi";

import AdminSidebar from "../../components/storeComponents/AdminSidebar";
import MetaData from "../../components/MetaData";

const UpdateProduct = () =>{
  const imgRef = useRef(null);
  const productRef = useRef({
    price: "",
    stock: ""
  });
  const { price, stock } = productRef.current;

  const [imageData, setImageData] = useState({
    images: [],
    imagesPreview: [],
    uploadedImages: []
  });
  const { images, imagesPreview, uploadedImages } = imageData;

  const navigate = useNavigate();
  const params = useParams();

  const theme = useSelector((state) => state.theme);
  const { data } = useGetProductDetailsQuery(params?.id);
  const [updateProduct, { error, isLoading, isSuccess }] = useUpdateProductMutation();

  const productDataHandler = (e) =>{
    productRef.current = { ...productRef.current, [e.target.name]: e.target.value };
  };

  const validateProductImage = (e) =>{
    const files = Array.from(e.target.files);

    files.forEach((file) =>{
      const reader = new FileReader();

      reader.onload = () =>{
        if(reader.readyState === 2){
          setImageData((prevData) =>({
            ...prevData,
            images: [...prevData.images, reader.result],
            imagesPreview: [...prevData.imagesPreview, reader.result]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  }

  const handleImages = (image) =>{
    const filteredImages = imageData.imagesPreview.filter((img) => img !== image);
    setImageData((prevData) =>({
      ...prevData,
      imagesPreview: filteredImages,
      images: filteredImages
    }));
  };

  const resetImagesHandler = () =>{
    if(imgRef.current){
      imgRef.current.value = ""
    }
  }

  useEffect(() =>{
    if(data?.product){
      productRef.current.price = data?.product?.price;
      productRef.current.stock = data?.product?.stock;

      setImageData({
        images: [],
        imagesPreview: [],
        uploadedImages: data?.product?.images
      });
    }

    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("Product updated");
      navigate("/admin/dashboard");
    }
  }, [data?.product, error, isSuccess, navigate]);

  const updateProductHandler = (e) =>{
    e.preventDefault();
    const updatedProduct = {
      price: price,
      stock: stock,
      images: images
    };
    updateProduct({ id: params?.id, body: updatedProduct });
  };

  return(
    <>
      <AdminSidebar>
      <MetaData title={"Update Product"}/>
        <Row as="section">
          <Col as="section" lg={10} className="col-12 mt-lg-0">
            <Form onSubmit={updateProductHandler}
            className={`product-form ${theme ? "shadow-lg" : "dark"}`}>
              <Row as="section">
                <Col as="section">
                  <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Price">
                    <Form.Control type="number" data-bs-theme={theme ? "light" : "dark"}
                    name="price"
                    defaultValue={price}
                    onChange={productDataHandler}/>  
                  </FloatingLabel>
                </Col>

                <Col as="section">
                  <FloatingLabel className="mt-4" data-bs-theme={theme ? "light" : "dark"} label="Stock">
                    <Form.Control type="number" data-bs-theme={theme ? "light" : "dark"}
                    name="stock"
                    defaultValue={stock}
                    onChange={productDataHandler}/>  
                  </FloatingLabel>
                </Col>
              </Row>

              <Form.Group className="mt-4">
                <Form.Control type="file" data-bs-theme={theme ? "light" : "dark"}
                ref={imgRef}
                name="product_images"
                onChange={validateProductImage}
                onClick={resetImagesHandler}
                multiple/>
              </Form.Group>
              
              {imagesPreview.length > 0 && (
                <section className="my-4">
                  <p className="text-black">New Images:</p>
                  <Row as="section">
                    {imagesPreview?.map((img) =>(
                      <Col as="section" md={3} className="col-6">
                        <Card data-bs-theme={theme ? "light" : "dark"}
                        aria-required="true">
                          <img src={img} alt="Card"
                          className="card-img-top p-2"
                          style={{ width: "100%", height: "150px" }}/>

                          <Button type="button" variant="danger"
                          className="btn-block mt-1 py-0"
                          onClick={() => handleImages(img)}>
                            <FaTimes size="1.1rem" className="my-1"/>
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <p className="text-warning mt-3 h5">Updating the images will replace the current ones</p>
                </section>
              )}

              {uploadedImages.length > 0 && (
                <section className="my-4">
                  <p className="text-success">Current Product Images:</p>
                  <Row as="section">
                    {uploadedImages?.map((img) =>(
                      <Col as="section" md={3} className="col-6">
                        <Card data-bs-theme={theme ? "light" : "dark"}>
                          <img src={img?.url} alt="Card"
                          className="card-img-top p-2"
                          style={{ width: "100%", height: "150px" }}/>

                          <Button type="button" variant="danger" disabled
                          className="btn-block mt-1 py-0">
                            <FaTrash size="1.1rem" className="my-1"/>
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </section>
              )}
              <Button type="submit" className="btn-danger my-3"
              disabled={isLoading}>Update</Button>
            </Form>
          </Col>
        </Row>
      </AdminSidebar>
    </>
  )
}

export default UpdateProduct;