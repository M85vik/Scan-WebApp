import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    original: { type: String, required: true },
    processed: { type: String, required: true },
    type: { type: String, required: true },
    lowContrast: { type: Boolean, required: true }
  },
  { _id: false }
);

// const scanSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },
//     images: {
//       type: [imageSchema],
//       required: true
//     }
//   },
//   { timestamps: true }
// );


const scanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    images: {
      type: [imageSchema],
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
      default: "PENDING"
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);


export default mongoose.model("Scan", scanSchema);
