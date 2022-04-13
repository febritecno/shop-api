import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

//@DESC Get All Products
//@ROUTE /api/v1/products
//@METHOD GET
export const getAll = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate("user").select("-password");

  res
    .status(201)
    .json({
      success: true,
      count: products.length,
      data: products
    });
});

//@DESC Add Product
//@ROUTE /api/v1/products
//@METHOD POST
export const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    desc,
    price,
    stock
  } =
  req.body;
  const products = await Product.create({
    name,
    desc,
    price,
    stock,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: products
  });
});

//@DESC Update Product
//@ROUTE /api/v1/products/:id
//@METHOD PUT
export const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (req.user.id !== product.user.toString()) {
    res.status(401);
    throw new Error("User not authrized to update product");
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      success: true,
      data: product
    });
  }
});

//@DESC Delete Product
//@ROUTE /api/v1/products/:id
//@METHOD DELETE
export const deleteProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (req.user.id !== product.user.toString()) {
    res.status(401);
    throw new Error("User not authrized to update product");
  }

  await product.remove();

  res.status(201).json({
    success: true,
    data: {}
  });
});