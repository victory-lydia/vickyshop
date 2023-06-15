import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    costumerId: { type: String },
    paymentIntentId: { type: String },
    products: [
      {
        id: { type: String },
        name: { type: String },
        desc: { type: String },
        price: { type: String },
        image: { type: String },
        cartQuatity: { type: Number },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
