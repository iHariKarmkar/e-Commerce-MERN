import express from "express";
import {
  addProduct,
  getSingleProduct,
  listProduct,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add-product",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list-products", listProduct);
// productRouter.delete("/remove",adminAuth, removeProduct); // using req.body.id
productRouter.delete("/remove/:productId",adminAuth, removeProduct); // using req.params.productId
productRouter.get("/get-product/:productId", getSingleProduct); // using req.params.productId
// productRouter.get("/get-product", getSingleProduct); // using req.body;

export default productRouter;
