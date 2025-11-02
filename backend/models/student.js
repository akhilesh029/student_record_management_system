
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
}, {timestamps:true})

const student = mongoose.model("student", studentSchema);

export default student;