import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

//@DESC Get All Order
//@ROUTE /api/v1/orders
//@METHOD GET
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  res.status(201).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

//@DESC Check Order
//@ROUTE /api/orders/:id
//@METHOD GET
export const checkOrder = asyncHandler(async (req, res) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(201).json({
    success: true,
    data: order
  });
});

//@DESC Confirm Order
//@ROUTE /api/orders/confirm/:id
//@METHOD POST
export const confirmOrder = asyncHandler(async (req, res) => {
  let findOrder = await Order.findById(req.params.id);

  if (!findOrder) {
    res.status(404);
    throw new Error("Order not found");
  }

  var order = await Order.findByIdAndUpdate(req.params.id, {
    allCart: findOrder.allCart,
    amount: findOrder.amount,
    address: findOrder.address,
    telp: findOrder.telp,
    payment: findOrder.payment,
    status: "Sended",
    isvalid: true,
    iscancel: findOrder.iscancel
  }, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: order
  });
});

//@DESC Cancel Order
//@ROUTE /api/orders/cancel/:id
//@METHOD POST
export const cancelOrder = asyncHandler(async (req, res) => {
  let findOrder = await Order.findById(req.params.id);

  if (!findOrder) {
    res.status(404);
    throw new Error("Order not found");
  }

  var order = await Order.findByIdAndUpdate(req.params.id, {
    allCart: findOrder.allCart,
    amount: findOrder.amount,
    address: findOrder.address,
    telp: findOrder.telp,
    payment: findOrder.payment,
    status: "Canceled",
    isvalid: false,
    iscancel: true,
  }, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: order
  });
});

//@DESC Add Order
//@ROUTE /api/v1/orders
//@METHOD POST
export const addOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.find({
    user: req.user.id
  });

  if (cart.length === 0) {
    res.status(404);
    throw new Error("Cart is empty");
  }

  const order = await Order.create({
    allCart: cart,
    amount: req.body.amount,
    address: req.body.address,
    telp: req.body.telp,
    payment: req.body.payment,
    status: req.body.status,
  });

  res.status(201).json({
    success: true,
    data: order
  });
});

//@DESC Update Order
//@ROUTE /api/orders/:id
//@METHOD PUT
export const updateOrder = asyncHandler(async (req, res) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: order
  });
});

//@DESC Delete Order
//@ROUTE /api/orders/:id
//@METHOD DELETE
export const deleteOrder = asyncHandler(async (req, res) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order = await Order.findByIdAndDelete(req.params.id);

  res.status(201).json({
    success: true,
    data: {}
  });
});