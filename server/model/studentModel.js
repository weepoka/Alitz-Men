const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: false },
    password: { type: String },
    addrerss: { type: String },
    role: { type: String },
    area: {
      type: String,
    },
    division: {
      type: String,
    },
    mobile: { type: String, unique: true },
    orderList: [{ type: Schema.Types.ObjectId, ref: "Booked", virtual: true }],
    orderCount: { type: Number },
  },
  { timestamps: true }
);

studentSchema.virtual("order", {
  ref: "Booked",
  localField: "orderList",
  foreignField: "_id",
  // justOne: true,
});

studentSchema.set("toObject", { virtuals: true });
studentSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Student", studentSchema);
// name,email,password,addrerss,area,division,mobile
