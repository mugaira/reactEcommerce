import express from "express";
import { getProductById, getProducts } from "../controllers/productController";

const router = express.Router();

// Routes Handler

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
