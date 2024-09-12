import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, filterProductsCount }) =>{
  const currentPageRef = useRef();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);

  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() =>{
    currentPageRef.current = page;
  },[page])

  const setCurrentPageNo = (pageNumber)=>{
    currentPageRef.current = pageNumber;

    if(searchParams.has("page")){
      searchParams.set("page", pageNumber);
    }
    else{
      searchParams.append("page", pageNumber);
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  }

  return(
    <section className="d-flex justify-content-center my-3">
      {filterProductsCount > resPerPage && (
      <Pagination
      activePage={currentPageRef.current}
      itemsCountPerPage={resPerPage}
      totalItemsCount={filterProductsCount}
      onChange={setCurrentPageNo}
      nextPageText={"Next"}
      prevPageText={"Prev"}
      firstPageText={"<<"}
      lastPageText={">>"}
      itemClass="page-item"
      linkClass={`page-link ${theme ? "" : "dark"}`}/>
    )}</section>
  )
}

export default CustomPagination;