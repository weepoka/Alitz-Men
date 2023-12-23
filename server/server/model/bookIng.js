const mongoose = require("mongoose");
const { Schema } = mongoose;

const newSchema = new Schema(
  {
    cId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },

    pId: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    paymentBy: { type: String, default: "Cash on Delivery " },

    quantity: {
      type: Number,
    },

    TotalPrice: {
      type: Number,
    },
    vat: Number,
    Subtotal: Number,
    deliveryFee: Number,

    paidStatus: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },

    orderStatus: {
      type: String,
      enum: [
        "Order Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Canceled",
        "Assign",
      ],
      default: "Order Placed",
    },
    courierService: {
      type: String,
    },
    reason: {
      type: String,
    },
    courierLocation: {
      type: String,
    },
    courierPhone: {
      type: String,
    },
    courierMan: {
      type: String,
    },
    ifIn: { type: Boolean, default: true },
    extraInfo: String,
    employeId: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    },
    employeName: {
      type: String,
    },
    preEmp: {
      type: String,
    },
    processDate: {
      type: Date,
    },
    isAssignToEmployee: {
      type: Boolean,
      default: false,
    },
    isPreOrder: {
      type: Boolean,
      default: false,
    },
    isHide: {
      type: Boolean,
      default: false,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      virtual: true,
    },
    products: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true }
);

newSchema.virtual("customerData", {
  ref: "Student",
  localField: "cId",
  foreignField: "_id",
  justOne: true,
});

newSchema.set("toObject", { virtuals: true });
newSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Booked", newSchema);
