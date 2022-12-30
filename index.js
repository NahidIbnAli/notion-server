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
const mongoAtlasUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wgjxpn1.mongodb.net/notionDb?retryWrites=true&w=majority`;
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
// task schema
const taskSchema = new mongoose.Schema({
  taskText: String,
  taskImage: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// user model
const User = mongoose.model("Users", userSchema);
// task model
const Task = mongoose.model("Tasks", taskSchema);

// application routes
app.post("/users", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
      });
      const result = await newUser.save();
      return res.status(200).send(result);
    }
    res.status(200).send({ message: "email already exists" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task({
      taskText: req.body.taskText,
      taskImage: req.body.taskImage,
      email: req.body.email,
    });
    const result = await newTask.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/tasks/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const tasks = await Task.find({ email: email });
    if (tasks) {
      res.status(200).send(tasks);
    } else {
      res.status(404).send({
        message: "task not found",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Task.deleteOne({ _id: id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "task was not deleted for this id" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/", async (req, res) => {
  res.send("notion server is on");
});

app.listen(port, () => console.log(`notion server is running on port ${port}`));
