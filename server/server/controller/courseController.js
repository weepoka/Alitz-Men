const express = require("express");
const router = express.Router();
const Course = require("../model/courseModel");
const lib = require("../utils/staticFile");
const Student = require("../model/studentModel");
const emailV = require("../utils/mailing");

const newCourse = async (req, res) => {
  const {
    category,
    detail,
    price,
    discount,
    size,
    chest,
    height,
    shipping,
    shippingg,
  } = req.body;
  if (!category || !detail || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const url = req.files.url.map((img) => img.filename);
  console.log(url);

  try {
    const course = new Course({
      category,
      detail,
      price,
      discount,
      size,
      chest,
      height,
      url: url,
      shipping,
      shippingg,
    });

    const saveCourse = await course.save();
    if (!saveCourse) {
      return res.status(400).json({ error: "Not Created" });
    }
    return res
      .status(200)
      .json({ message: "Create successful", data: saveCourse });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", reason: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.find();
    if (course.length > 0) {
      return res.status(200).json({ message: "Successful", data: course });
    } else {
      return res.status(400).json({ error: "No Course Found " });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { pid } = req.params;

    if (pid.length > 20) {
      const course = await Course.findById({ _id: pid });

      if (course) {
        return res.status(200).json({ success: true, data: course });
      } else {
        return res
          .status(404)
          .json({ success: false, error: "No Course Found" });
      }
    } else {
      const course = await Course.findOne({ title: id });

      if (course) {
        return res.status(200).json({ success: true, data: course });
      } else {
        return res
          .status(404)
          .json({ success: false, error: "No Course Found" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error", reason: error.message });
  }
};

const delCourse = async (req, res) => {
  try {
    const uid = req.params.id;
    const courseToDelete = await Course.findById(uid);

    if (!courseToDelete) {
      return res.status(400).json({ error: "No Course Found" });
    }

    const deletedCourse = await Course.findByIdAndDelete(uid);

    if (deletedCourse) {
      courseToDelete.url.forEach((tit) => lib.delete(tit));

      return res.status(200).json({ message: "Delete successful" });
    } else {
      return res.status(400).json({ error: "Failed to delete course" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const onLine = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length > 20) {
      const online = await Course.findById({ _id: id });

      if (online.online) {
        const onlineSchedule = [];
        for (let i = 1; i <= 4; i++) {
          const optionInfo = {
            routine: online[`option${i}`].routine,
            classTime: online[`option${i}`].classTime,
            remainingSeat: online[`option${i}`].remainingSeat,
            seat: online[`option${i}`].seat,
          };
          onlineSchedule.push(optionInfo);
        }

        res.status(200).json({ message: "Ami Online", data: onlineSchedule });
      } else {
        res.status(404).json({ success: false, error: "No Course Found" });
      }
    } else {
      const online = await Course.findOne({ title: id });

      if (online.online) {
        const onlineSchedule = [];
        for (let i = 1; i <= 4; i++) {
          const optionInfo = {
            routine: online[`option${i}`].routine,
            classTime: online[`option${i}`].classTime,
            remainingSeat: online[`option${i}`].remainingSeat,
            seat: online[`option${i}`].seat,
          };
          onlineSchedule.push(optionInfo);
        }

        res.status(200).json({ message: "Ami Online", data: onlineSchedule });
      } else {
        res.status(404).json({ success: false, error: "No Course Found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const offLine = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length > 20) {
      const offline = await Course.findById({ _id: id });

      if (offline.offline) {
        const offlineSchedule = [];
        for (let i = 5; i <= 14; i++) {
          const optionInfo = {
            routine: offline[`option${i}`].routine,
            classTime: offline[`option${i}`].classTime,
            remainingSeat: offline[`option${i}`].remainingSeat,
            seat: offline[`option${i}`].seat,
          };
          offlineSchedule.push(optionInfo);
        }

        res
          .status(200)
          .json({ message: "Ami id Offline", data: offlineSchedule });
      } else {
        res
          .status(404)
          .json({ success: false, error: "No Mongo Course Found" });
      }
    } else {
      const offline = await Course.findOne({ title: id });

      if (offline.offline) {
        const offlineSchedule = [];
        for (let i = 5; i <= 14; i++) {
          const optionInfo = {
            routine: offline[`option${i}`].routine,
            classTime: offline[`option${i}`].classTime,
            remainingSeat: offline[`option${i}`].remainingSeat,
            seat: offline[`option${i}`].seat,
          };
          offlineSchedule.push(optionInfo);
        }

        res
          .status(200)
          .json({ message: "Ami bar Offline", data: offlineSchedule });
      } else {
        res
          .status(404)
          .json({ success: false, error: "No Navbar Course Found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};
const dropDown = async (req, res) => {
  try {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const dropStudentList = await Student.find({
      $or: [
        { activeCourseEnd: { $lt: twoMonthsAgo } },
        { $expr: { $lt: [{ $size: "$myCourse" }, 1] } },
      ],
    });

    res.status(200).json({
      message: `Drop Student${dropStudentList.length > 1 ? "s" : ""}: ${
        dropStudentList.length
      } `,
      data: dropStudentList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const mesDrop = async (req, res) => {
  try {
    const { id } = req.params;
    const { mess } = req.body;
    console.log(id, mess);
    const matchUser = await Student.findById(id, "-password");

    if (!matchUser) {
      return next(new NotFoundError("No result found"));
    }
    emailV(matchUser.email, ``, `Hello ${matchUser.name}`, `${mess} `);
    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error", reason: error.message });
  }
};

//############################# get Category ####
const getCourseByCat = async (req, res) => {
  try {
    const { pid } = req.params;
    console.log(pid);
    const course = await Course.find({ category: pid });

    if (course.length > 0) {
      return res.status(200).json({ success: true, data: course });
    }
    return res.status(404).json({ success: false, error: "No Course Found" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error", reason: error.message });
  }
};
//############################# get Category ####
module.exports = {
  newCourse,
  getCourse,
  delCourse,
  onLine,
  offLine,
  getCourseById,
  dropDown,
  mesDrop,
  getCourseByCat,
};
