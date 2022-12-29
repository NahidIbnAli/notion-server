// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const taskSchema = require("../schemas/taskSchema");
// const Task = new mongoose.model("Tasks", taskSchema);

// // get all the tasks
// router.get("/", async (req, res) => {
//   await Task.find({ status: "active" }, (error, data) => {
//     if (error) {
//       res.status(500).json({
//         error: "There was a server side error!",
//       });
//     } else {
//       res.status(200).json({
//         result: data,
//         message: "Task was inserted successfully!",
//       });
//     }
//   });
// });

// // get a task by id
// router.get("/:id", async (req, res) => {});

// // post task
// router.post("/", async (req, res) => {
//   const newTask = new Task(req.body);
//   await newTask.save((error) => {
//     if (error) {
//       res.status(500).json({
//         error: "There was a server side error!",
//       });
//     } else {
//       res.status(200).json({
//         message: "Task was inserted successfully!",
//       });
//     }
//   });
// });

// // post multiple tasks
// router.post("/all", async (req, res) => {});

// // put task
// router.put("/:id", async (req, res) => {});

// // delete task
// router.delete("/:id", async (req, res) => {});

// module.exports = router;
