import mongoose, {Schema} from "mongoose"

const leadSchema = new Schema({
    date: {
        type: String,
        required: true,
      },
      client: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
      },
    
      budget: {
        type: Number,
      },
      request: {
        type: String,
      },
      status: {
        type: String,
        default: "pending",
      },
      created: {
        type: Date,
        default: Date.now,
      },
})

export const Lead = mongoose.model("Lead", leadSchema)