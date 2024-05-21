import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema(
    {
        name: {type: String, required: true},
        surname: {type: String, required: true},
        email: {
            type: String, 
            required: true,
            unique: true, 
            lowercase: true,
            trim: true
        },
        password: {type: String, required: true},
        photo: {type: String, default: null, trim: true},
        isLoggedIn: {type: Boolean, default: false},
        removed: {
            type: Boolean,
            default: false,
          },
          enabled: {
            type: Boolean,
            default: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
         
    }
)

export const Admin = mongoose.model("Admin", adminSchema)