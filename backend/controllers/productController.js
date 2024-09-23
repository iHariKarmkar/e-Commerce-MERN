import { v2 as cloudinary } from "cloudinary";
import productModal from "../models/productModel.js";
// Route to add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now(),
    };

    const product = new productModal(productData);
    await product.save();
    res.json({ success: true, message: "Product Added", productData });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

// Route to list product
const listProduct = async (req, res) => {
  try {
    const products = await productModal.find({});
    res.json({ success: true, message: "Fetched All Products!", products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route to remove product
const removeProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    await productModal.findByIdAndDelete(productId);
    // await productModal.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: `Product deleted!`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route to get single product
const getSingleProduct = async (req, res) => {
  try {
    // const { productId } = req.body;
    const productId = req.params.productId;
    const product = await productModal.findById(productId);
    res.json({ success: true, message: "Successfully fetched!", product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, getSingleProduct };
