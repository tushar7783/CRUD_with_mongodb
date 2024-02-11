// const url=require('url') //it provide all info about the url
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");

// connection
mongoose
  .connect("mongodb://127.0.0.1:27017/user-app-1")
  .then(() => {
    console.log("connect mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

// connection

// Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true, //it is used if you have to prvide the fields
  },
  lastName: {
    type: String,
    // require:true
  },
  email: {
    type: String,
    require: true,
    unique: true, //same email should not be in databse
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
    // enum: [Male, female, Other],
    // default: other,
  },
});

// Schema
const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use("/get", routes);

app.get("/getuser", async (req, res) => {
  try {
    const result = await User.find({});
    if (result) {
      console.log(result);
      res.status(200).json({
        message: `All User `,
        success: true,
        result: { result },
      });
    } else {
      console.log(result);
      res.status(400).json({ error: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});
app.get("/getuserby/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findById(id);
    if (result) {
      console.log(result);
      res.status(200).json({
        message: `All User `,
        success: true,
        result: { result },
      });
    } else {
      console.log(result);
      res.status(400).json({ error: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

app.post("/user", async (req, res) => {
  try {
    const { firstName, lastName, email, jobTitle, gender } = req.body;
    const result = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      jobTitle: jobTitle,
      gender: gender,
    });

    if (result) {
      console.log(result);
      res.status(201).json({
        message: `craeted user`,
        success: true,
        result: { result },
      });
    } else {
      console.log(result);
      res.status(400).json({ error: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "this is home page" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
