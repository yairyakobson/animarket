import express from "express";
const router = express.Router();

import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

import { newProduct } from "../controllers/products/create.js";
import { getProduct, getProducts } from "../controllers/products/read.js";
import { updateProduct } from "../controllers/products/update.js";
import { deleteProduct } from "../controllers/products/delete.js";

import { newProductReview } from "../controllers/reviews/create.js";
import { getProductReviews } from "../controllers/reviews/read.js";
import { deleteProductReview } from "../controllers/reviews/delete.js";

import { getAdminProducts } from "../controllers/users/admin/adminGetProducts.js";

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProduct);
router.route("/product/new").post(isAuthenticatedUser, newProduct);

router.route("/").post(isAuthenticatedUser);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("Admin"), getAdminProducts);
router.route("/admin/product/:id")
.put(isAuthenticatedUser, authorizeRoles("Admin"), updateProduct)
.delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteProduct);

// Review Routes
router.route("/review")
.get(isAuthenticatedUser, getProductReviews)
.put(isAuthenticatedUser, newProductReview);

router.route("/admin/reviews").delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteProductReview);

export default router;