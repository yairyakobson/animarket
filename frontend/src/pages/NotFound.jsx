import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";

import error404 from "../assets/error404.png";
import MetaData from "../components/MetaData";

const NotFound = () =>{
  const theme = useSelector((state) => state.theme);

  return(
    <section>
      <MetaData title={"Page Not Found"}/>
      {" "}
      <Row as="section">
        <section className="d-flex justify-content-center mt-3 mt-lg-5">
          <img src={error404} alt="404 Not Found"
          height="100%"
          width="30%"/>
        </section>
        <h5 className={`text-center mt-3 mt-lg-5 ${theme ? "" : "text-light"}`}>
          Page Not Found. Go to <a href="/">Homepage</a>
        </h5>
      </Row>
      <section className="mt-2"/>
    </section>
  )
}

export default NotFound;