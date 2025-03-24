import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    primary: {
      street:{
        type: String,
        required: false,
        default: ""
      },
      city:{
        type: String,
        required: false,
        default: ""
      },
      stateProvince:{
        type: String,
        required: false,
        default: "",
      },
      postal: {
        type: Number,
        required: false,
        default: 0
      },
      country:{
        type: String,
        required: false,
        default: ""
      }
    },
    billing: {
        street:{
            type: String,
            required: false,
            default: ""
          },
          city:{
            type: String,
            required: false,
            default: ""
          },
          stateProvince:{
            type: String,
            required: false,
            default: "",
          },
          postal: {
            type: Number,
            required: false,
            default: 0
          },
          country:{
            type: String,
            required: false,
            default: ""
          }
    },
    isSame: {
        type: Boolean,
        required: false,
        default: true
    },
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model("Address", addressSchema);