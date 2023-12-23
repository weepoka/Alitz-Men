const express = require("express");
const _ = express.Router();
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const SSLCommerzPayment = require("sslcommerz-lts");
const tran_id = new ObjectId().toString();
const back_url = process.env.SERVER_URL;
const front_url = process.env.CLIENT_URL;
const API = process.env.BASE_URL;
const emailV = require("../../utils/mailing");
const Invoice = require("../../model/paymentData");
const Booked = require("../../model/bookIng");
const Course = require("../../model/courseModel");
const Student = require("../../model/studentModel");
const { tryCatch } = require("../../utils/tryCatch");
const { sendOrderConfirmationEmail } = require("../../utils/orderMail");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../customError");

// const myBooked = tryCatch(async (req, res, next) => {
//   const { userInfo, products, Subtotal, deliveryFee, TotalPrice } = req.body;
//   console.log(userInfo);
//   let saveCustomer = null;
//   const mx0 = await Student.findOne({
//     $or: [{ email: userInfo.email, mobile: userInfo.mobile }],
//   });
//   if (!mx0) {
//     const newCustomer = new Student({
//       name: userInfo.name,
//       email: userInfo.email,
//       addrerss: userInfo.addrerss,
//       area: userInfo.area,
//       division: userInfo.division,
//       mobile: userInfo.mobile,
//     });

//     saveCustomer = await newCustomer.save();
//     if (!saveCustomer) {
//       return next(new InvalidEntry("Data Invalid"));
//     }
//   }
//   const pid = products.map((item) => item._id);

//   for (const id of pid) {
//     const findProduct = await Course.findByIdAndUpdate(
//       id,
//       { $inc: { saleCount: 1 } },
//       { new: true }
//     );
//   }

//   const createOrder = new Booked({
//     cId: saveCustomer ? saveCustomer._id : mx0._id,
//     pId: pid,
//   });

//   const saveOrder = await createOrder.save();
//   if (!saveOrder) {
//     return next(new InvalidEntry("Order not save"));
//   }
//   //###########################################
//   // let totalPrice = 0;
//   // let disc = 0;
//   // let ship = [];
//   // let shipp = [];

//   // for (const id of pid) {
//   //   const findProduct = await Course.findByIdAndUpdate(
//   //     id,
//   //     { $inc: { saleCount: 1 } },
//   //     { new: true }
//   //   );

//   //   totalPrice += findProduct.price;
//   //   disc += findProduct.discount;

//   //   if (ifIn) {
//   //     ship.push(findProduct.shipping);
//   //   } else {
//   //     shipp.push(findProduct.shipping);
//   //   }
//   // }
//   //####################################################
//   const percentage = 15;
//   const vat = (percentage / 100) * (TotalPrice - deliveryFee);

//   const updateOrder = await Booked.findByIdAndUpdate(
//     saveOrder._id,
//     {
//       $set: {
//         Subtotal,
//         deliveryFee,
//         TotalPrice,
//         deliveryFee,
//         vat,
//         products,
//       },
//     },
//     { new: true }
//   );
//   if (!updateOrder) {
//     const oderDelete = await Booked.findByIdAndDelete({
//       _id: saveOrder._id,
//     });

//     return next(new InvalidEntry("Order does not placed ,try again"));
//   }

//   const cust = await Student.findByIdAndUpdate(
//     mx0._id ? mx0._id : saveCustomer._id,
//     { $push: { orderList: updateOrder._id } },
//     { new: true }
//   );

//   const ifOrder = await Booked.findById(updateOrder._id).populate(
//     "customerData"
//   );
//   console.log(ifOrder);
//   return;
//   // sendOrderConfirmationEmail(cust.email, ifOrder);
//   // return res.status(200).json({ message: "Order Created", data: updateOrder });
// });

const myBooked = tryCatch(async (req, res, next) => {
  const { userInfo, products, Subtotal, deliveryFee, TotalPrice } = req.body;

  let saveCustomer = null;
  const mobile = userInfo.mobile;
  // Check for an existing customer by email or mobile
  const mx0 = await Student.findOne({ mobile: mobile });

  if (mx0 !== null) {
    // Reuse the existing customer
    saveCustomer = mx0;
  } else {
    // Create a new customer
    const newCustomer = new Student({
      name: userInfo.name,
      email: userInfo.email,
      addrerss: userInfo.addrerss,
      area: userInfo.area,
      division: userInfo.division,
      mobile: userInfo.mobile,
    });

    saveCustomer = await newCustomer.save();
    if (!saveCustomer) {
      return next(new InvalidEntry("Data Invalid"));
    }
  }

  const pid = products.map((item) => item._id);

  for (const id of pid) {
    const findProduct = await Course.findByIdAndUpdate(
      id,
      { $inc: { saleCount: 1 } },
      { new: true }
    );
  }

  const createOrder = new Booked({
    cId: saveCustomer._id,
    pId: pid,
  });

  const saveOrder = await createOrder.save();
  if (!saveOrder) {
    return next(new InvalidEntry("Order not save"));
  }

  const percentage = 15;
  const vat = (percentage / 100) * (TotalPrice - deliveryFee);

  const updateOrder = await Booked.findByIdAndUpdate(
    saveOrder._id,
    {
      $set: {
        Subtotal,
        deliveryFee,
        TotalPrice: TotalPrice + vat,

        vat,
        products,
      },
    },
    { new: true }
  );

  if (!updateOrder) {
    await Booked.findByIdAndDelete({ _id: saveOrder._id });
    return next(new InvalidEntry("Order does not placed, try again"));
  }

  const cust = await Student.findByIdAndUpdate(
    saveCustomer._id,
    { $push: { orderList: updateOrder._id } },
    { new: true }
  );

  const ifOrder = await Booked.findById(updateOrder._id).populate(
    "customerData"
  );
  console.log(ifOrder);

  sendOrderConfirmationEmail(cust.email, ifOrder);
  return res.status(200).json({ message: "Order Created", data: updateOrder });
});

//##############################################################
//##############################################################
const updateOrder = tryCatch(async (req, res, next) => {
  const oid = req.params.id;

  const data = req.body;
  console.log(oid, data.status);
  let lib = {};

  data.paidStatus && (lib.paidStatus = data.paidStatus);
  data.orderStatus && (lib.orderStatus = data.orderStatus);
  data.status && (lib.orderStatus = data.status);
  data.courierService && (lib.courierService = data.courierService);
  data.courierLocation && (lib.courierLocation = data.courierLocation);
  data.courierPhone && (lib.courierPhone = data.courierPhone);
  data.courierMan && (lib.courierMan = data.courierMan);
  data.employeId && (lib.employeId = data.employeId);
  data.reason && (lib.reason = data.reason);
  data.employeName && (lib.employeName = data.employeName);
  data.isAssignToEmployee && (lib.isAssignToEmployee = data.isAssignToEmployee);
  data.isPreOrder && (lib.isPreOrder = data.isPreOrder);
  data.preEmp && (lib.preEmp = data.preEmp);
  data.isHide && (lib.isHide = data.isHide);

  const ifOrder = await Booked.findByIdAndUpdate(
    oid,
    { $set: lib },
    { new: true }
  );
  if (!ifOrder) {
    return next(new InvalidEntry("Order does not update ,try again"));
  }
  return res.status(200).json({ message: "Order update", data: ifOrder });
});

const getAll = tryCatch(async (req, res, next) => {
  const ifOrder = await Booked.find({ isHide: false }).populate("customerData");
  if (ifOrder.length < 1) {
    return next(new NotFoundError("No order found"));
  }
  return res.status(200).json({ message: ifOrder.length, data: ifOrder });
});

const getOne = tryCatch(async (req, res, next) => {
  const oid = req.params.id;
  const ifOrder = await Booked.findById(oid).populate("customerData");

  if (!ifOrder) {
    return next(new NotFoundError("No order found"));
  }
  return res.status(200).json({ data: ifOrder });
});

const ordDelete = tryCatch(async (req, res, next) => {
  const oid = req.params.ids;
  console.log(oid);
  const delOrder = await Booked.findByIdAndDelete(oid);
  if (!delOrder) {
    return next(new BadRequestError("Id not match"));
  }

  return res.status(200).json({ message: "Deleted" });
});

module.exports = {
  myBooked,
  updateOrder,
  getAll,
  getOne,
  ordDelete,
};
