const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    price: { type: Number },
    shipping: { type: Number },
    shippingg: { type: Number },
    discount: { type: Number },
    chest: { type: String },
    height: { type: String },
    size: { type: String },
    detail: {
      type: String,
    },

    url: [{ type: String }],
    saleCount: { type: Number, default: 0 },
    badge: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
