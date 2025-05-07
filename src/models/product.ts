import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: [
      {
        id: { type: Number },
        isChecked: { type: Boolean },
        name: { type: String },
      },
    ],
    size: [
      {
        id: { type: Number },
        isChecked: { type: Boolean },
        name: { type: String },
      },
    ],

    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
