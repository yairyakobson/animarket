import express from "express";
const router = express.Router();

import { isAuthenticatedUser } from "../middlewares/auth.js";

import { checkout } from "../controllers/payment/checkout.js";
import { webhook } from "../controllers/payment/webhook.js";

router.route("/payment/checkout").post(isAuthenticatedUser, checkout);
router.route("/payment/webhook").post(webhook);

export default router;