import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    enabled: {
        type: Boolean,
        default: true,
      },
      productName: {
        type: String,
        trim: true,
        required: true,
      },
      description: {
        type: String,
        trim: true,
      },
      price: {
        type: Number,
      },
      status: {
        type: String,
        default: "available",
      }
})

export const Product = mongoose.model("Product", productSchema)