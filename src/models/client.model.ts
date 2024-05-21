import mongoose, {Schema} from "mongoose";

const clientSchema = new Schema(
    {
          name: {
            type: String,
            trim: true,
            required: true,
          },
          email: {
            type: String,
            trim: true,
            lowercase: true,
          },
          password: {
            type: String,
            required: true,
          },
          country: {
            type: String,
            trim: true,
          },
          surname: {
            type: String,
            trim: true,
            required: true,
          },
          bankAccount: {
            type: String,
            trim: true,
          },
          companyRegNumber: {
            type: String,
            trim: true,
          },
          companyTaxNumber: {
            type: String,
            trim: true,
          },
          companyTaxID: {
            type: String,
            trim: true,
          },
          customField: [
            {
              fieldName: {
                type: String,
                trim: true,
              },
              fieldValue: {
                type: String,
                trim: true,
              },
            },
          ],
          address: {
            type: String,
            trim: true,
          },
          phone: {
            type: String,
            trim: true,
            required: true,
          },
          website: {
            type: String,
            trim: true,
          },
          enabled: {
            type: Boolean,
            default: true,
          },
          company: {
            type: String,
            trim: true,
            required: true,
          },
          created: {
            type: Date,
            default: Date.now,
          },
          refreshToken: {
            type: String
        },

    }
)

export const client = mongoose.model("Client", clientSchema)