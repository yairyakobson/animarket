import { fetchSingleProduct } from "../../dataAccess/productCases.js";
import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";
import APIFilters from "../../utils/apiFilters.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const getProduct = asyncErrors(async(req, res, next) =>{
  const product = await fetchSingleProduct(req?.params?.id);

  if(!product){
    return next(new ErrorHandler("Product Not Found", 404));
  };
  res.status(200).json({ product });
});

export const getProducts = asyncErrors(async(req, res, next) =>{
  const resPerPage = 4
  const apiFilters = new APIFilters(Product, req.query)
  .search()
  .filter();

  let products = await apiFilters.query;
  let filterProductsCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filterProductsCount,
    products
  });
});