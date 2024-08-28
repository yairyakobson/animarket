import express from "express";

import orderRoutes from "./orderRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import productRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use(orderRoutes);
router.use(paymentRoutes);
router.use(productRoutes);
router.use(userRoutes);

export default router;