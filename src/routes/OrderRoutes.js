import express from "express";
import {
  getOrders,
  addOrder,
  checkOrder,
  cancelOrder,
  confirmOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/OrderController.js";
import ProtectMiddleware from "../middlewares/ProtectMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(ProtectMiddleware, getOrders)
  .post(ProtectMiddleware, addOrder);

router
  .route("/cancel/:id")
  .put(ProtectMiddleware, cancelOrder);

router
  .route("/confirm/:id")
  .put(ProtectMiddleware, confirmOrder);

router
  .route("/:id")
  .get(ProtectMiddleware, checkOrder)
  .put(ProtectMiddleware, updateOrder)
  .delete(ProtectMiddleware, deleteOrder);

export default router;