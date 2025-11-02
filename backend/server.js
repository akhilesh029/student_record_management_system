import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import Student from "./models/student.js";

dotenv.config();
const db_url = process.env.MONGODB_URL;

const app = express();
// app.use(cors());
app.use(express.json());

mongoose
  .connect(db_url)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.error("Error: ", error.message);
  });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.get("/", (req, res) => {
  console.log("api is running....");
});

app.post("/api/student", async (req, res) => {
  try {
    const {name, rollNo, course, marks} = req.body;

    const newStudent = new Student({
      name,
      rollNo,
      course,
      marks,
    });

   await newStudent.save();

    res.status(201).json({message: "student added!", data: newStudent})
  } catch (error) {
    res.status(400).json({message: error.message});
  } 
});

app.get("/api/students", async (req, res)=>{
   try {
     const students = await Student.find({})
     res.status(200).json({data: students})
   } catch (error) {
      res.status(500).json({error: error.message})
   }
   
})

app.delete("/api/student/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to delete the student
    const deletedStudent = await Student.findByIdAndDelete(id);

    // If no student found with that ID
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      data: deletedStudent, // optional: send deleted object instead of just id
    });

  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ UPDATE student by ID
app.patch("/api/student/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updatedStudent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log("server is running on Port: ", PORT);
});
