/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";

import { setCartProduct } from "../../redux/features/cartSlice";
import { useGetProductDetailsQuery } from "../../redux/services/productApi";
import Loader from "../../components/Loader";
import MetaData from "../../components/MetaData";
import NewReview from "../../components/storeComponents/NewReview";
import ReviewList from "../../components/storeComponents/ReviewList";
import NotFound from "../../pages/NotFound";
import "../styles/ProductStyle.css"

const ProductDetails = () =>{
  const [activeImg, setActiveImg] = useState("");
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const dispatch = useDispatch();
  const { data, error, isError, isLoading } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;

  const theme = useSelector((state) => state.theme);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() =>{
    setActiveImg(product?.images[0] && product?.images[0]?.url);
  }, [product]);

  useEffect(() =>{
    if(isError){
      toast.error(error?.data?.message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error?.data?.message]);

  const increaseQty = () =>{
    const count = document.querySelector(".count");
    if(count.valueAsNumber >= product?.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  }

  const decreaseQty = () =>{
    const count = document.querySelector(".count");
    if(count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  }

  const addToCart = () =>{
    const cartProducts ={
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity
    }
    dispatch(setCartProduct(cartProducts));
    toast.success("Item added to cart");
 }

 if(isLoading) return <Loader/>;

 if(error && error?.status === 404){
   return <NotFound/>
 }

 return(
   <>
     <MetaData title={product?.name}/>
       <Container as="section" className={`${theme ? "" : "dark"}`}>
         <Row as="section" className="d-flex justify-content-around">
           <Col as="section" lg={6} className="col-10" id="product_image">
             <section className="p-3">
               <img className="d-block w-100"
               src={activeImg}
               alt={product?.name}
               height="400px"/>
             </section>

             <Row as="section" className="justify-content-start mt-2">
               {product?.images?.map((img) =>(
                 <Col as="section" md={3} lg={3} className="col-5 ms-3" key={img?._id}>
                   <Button as="a" className="bg-transparent border-0">
                     <img className={`d-block border rounded p-3 p-lg-2 cursor-pointer ${
                     img.url === activeImg && "border-danger"}`}
                     height="100"
                     width="100"
                     src={img?.url}
                     alt={img?.url}
                     onClick={() => setActiveImg(img.url)}/>
                   </Button>
                 </Col>
               ))}
             </Row>
           </Col>

           <Col as="section" lg={6} className="col-10" id="product_details">
             <h3>{product?.name}</h3>

             <section className="d-flex">
               <Rating
               iconsCount={5}
               initialValue={product?.rating}
               allowFraction={true}
               fillColor="#FFA41C"
               size="20px"
               readonly/>
               <span id="no-of-reviews" className="pt-1 px-2">
                 ({product?.totalReviews} Reviews)
               </span>
             </section>
             <hr/>

             <p id="product_price">${product?.price}</p>

             <section className="stockCounter d-inline">
               <Button variant="danger" className="minus"
               onClick={decreaseQty}
               disabled={product?.stock === 0 || !user || product?.seller === user?.name}>-</Button>

               <Form.Control type="number"
               className={`stockCounter count d-inline border-0 ${theme ? "" : "dark"}`}
               value={quantity}
               onChange={(e) =>setQuantity(e.target.value)}
               readOnly/>

               <Button variant="danger" className="plus"
               onClick={increaseQty}
               disabled={product?.stock === 0 || !user || product?.seller === user?.name}>+</Button>
             </section>

             <Button id="cart_btn"
             className="btn-danger d-inline ms-4 ms-md-4 ms-lg-4"
             disabled={product?.stock === 0 || !user || product?.seller === user?.name}
             onClick={addToCart}>Add to Cart</Button>

             <hr/>

             <p>Condition:<span id="stock_status">{product?.condition}</span></p>
             <p>Stock:
               <span id="stock_status"
               className={product?.stock > 0 ? "greenColor" : "redColor"}>
                 {product?.stock > 0 ? `In Stock ${product?.stock === 1 ? "(Only 1 left)" : ""}` : "Out of Stock"}
               </span>
             </p>

             <hr/>
             <p>Description: {product?.description}</p>
             <p>Sold by: <strong>{product?.seller}</strong></p>

             {isAuthenticated ? <NewReview productId={product?._id}/> : (
               <Alert className="alert-danger my-5">
                 Login to post your review.
               </Alert>
             )}
           </Col>
         </Row>
         {product?.reviews && product?.reviews?.length > 0 && (
           <ReviewList reviews={product?.reviews}/>
         )}
       </Container>
   </>
 )
}

export default ProductDetails;