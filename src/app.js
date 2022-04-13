import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import {
  notFound,
  errorHandler
} from "./middlewares/ErrorMiddleware.js";

//ROUTES
import UserRoutes from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

// WELCOME ROUTE
app.get("/api/v1/", (req, res) => {
  res
    .status(201)
    .json({
      success: true,
      message: "Welcome rest api"
    });
});

//USER ROUTES
app.use("/api/v1/users", UserRoutes);

//AUTH ROUTES
app.use("/api/v1/auth", AuthRoutes);

//PRODUCTS ROUTES
app.use("/api/v1/products", ProductRoutes);

//CART ROUTES
app.use("/api/v1/cart", CartRoutes);

//ORDER ROUTES
app.use("/api/v1/orders", OrderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running on PORT => ${PORT}`));