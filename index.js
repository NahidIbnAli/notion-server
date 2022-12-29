const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// express app initialization
const app = express();
app.use(express.json());
app.use(cors());

// database connection with mongoose
const mongoAtlasUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wgjxpn1.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(mongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((error) => console.log(error));

// user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// user schema
const taskSchema = new mongoose.Schema({
  taskText: String,
  taskImage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// user model
const User = mongoose.model("Users", userSchema);
// user model
const Task = mongoose.model("Tasks", userSchema);

// application routes
// app.use("/task", taskModel);
app.post("/users", async (req, res) => {
  try {
    const user = req.body.user;
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// task routes
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task({
      taskText: req.body.taskText,
      taskImage: req.body.taskImage,
    });
    const result = await newTask.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/", async (req, res) => {
  res.send("notion server is on");
});

app.listen(port, () => console.log(`notion server is running on port ${port}`));
