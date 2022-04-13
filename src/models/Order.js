import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  allCart: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },

    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add a product"],
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    }, ],
  }, ],

  amount: {
    type: Number,
    required: [true, "Please add an amount"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  telp: {
    type: String,
    required: [true, "Please add a telp"],
  },
  payment: {
    type: String,
    required: [true, "Please add a payment"],
  },
  status: {
    type: String,
    required: [true, "Please add a status"],
    default: "pending",
  },
  isvalid: {
    type: Boolean,
    required: [false, "Please add a isvalid"],
    default: false,
  },
  iscancel: {
    type: Boolean,
    required: [false, "Please add a iscancel"],
    default: false,
  }
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;