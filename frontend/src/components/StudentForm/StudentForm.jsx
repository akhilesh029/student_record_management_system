import React, { useState } from "react";
import axios from "axios";
import "./StudentForm.css";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)

const StudentForm = () => {
  const [student, setStudent] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState(0);

  const handleAddStudent = async (e) => {
    e.preventDefault(); // prevent page reload

    const newStudent = { name, rollNo, course, marks };

    if (newStudent.name.trim()) {
      const response = await axios.post(`${API_URL}/api/student`, newStudent);

      setStudent([...student, newStudent]);
      setName("");
      setRollNo("");
      setCourse("");
      setMarks(0);

      console.log(response);
    }
  };

  return (
    <div id="form-container">
      <h2 className="form-title">🎓 Add Student Details</h2>

      <form id="student-form" onSubmit={handleAddStudent}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rollNo">Roll Number</label>
          <input
            id="rollNo"
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter roll number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <input
            id="course"
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="marks">Marks</label>
          <input
            id="marks"
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Enter marks"
            required
          />
        </div>

        <button id="submit-btn" type="submit">
          ➕ Add Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
