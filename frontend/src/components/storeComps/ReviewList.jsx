import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";

const ReviewList = ({ reviews }) =>{
  const theme = useSelector((state) => state.theme);

  return(
    <section className="mt-2 mt-md-0 mt-lg-5">
      <h3 className="mt-5">Reviews:</h3>
      {reviews && reviews.map((review) =>(
        <section key={review._id} className="py-3 px-3 my-4"
        style={{ backgroundColor: theme ? "#EDEDED": "#15191C" }}>
          <img src={review?.user?.picture?.url} alt=""
          className="rounded-circle"
          width="45"
          height="45"/>
            <p className="px-1 py-2 my-0">by {review?.user?.name}</p>
            <Rating
            iconsCount={5}
            allowFraction={true}
            initialValue={review?.rating}
            fillColor="#FFA41C"
            size="22px"
            readonly/>
            <p className="px-1 mt-2">{review?.comment}</p>
        </section>
       ))}
    </section>
  )
}
export default ReviewList;