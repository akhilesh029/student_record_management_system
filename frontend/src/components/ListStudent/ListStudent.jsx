import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ListStudent.css";

const API_URL = import.meta.env.VITE_API_URL;

const ListStudent = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", rollNo: "", course: "", marks: "" });

  // Fetch all students
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/students`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchData();
  }, []);

  // Delete student
  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/student/${id}`);
      setData((prevData) => prevData.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Start editing
  const handleEditClick = (student) => {
    setEditId(student._id);
    setEditForm({
      name: student.name,
      rollNo: student.rollNo,
      course: student.course,
      marks: student.marks,
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Update student
  const handleUpdateStudent = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/api/student/${id}`, editForm);
      console.log("Updated:", response.data);

      // Update UI instantly
      setData((prevData) =>
        prevData.map((student) =>
          student._id === id ? { ...student, ...editForm } : student
        )
      );

      setEditId(null); // close edit mode
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student List</h1>

      {data.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Course</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student._id}>
                {editId === student._id ? (
                  <>
                    <td>
                      <input
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="rollNo"
                        value={editForm.rollNo}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="course"
                        value={editForm.course}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="marks"
                        value={editForm.marks}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleUpdateStudent(student._id)}>💾 Save</button>
                      <button onClick={() => setEditId(null)}>❌ Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{student.name}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.course}</td>
                    <td>{student.marks}</td>
                    <td>
                      <button onClick={() => handleEditClick(student)}>✏️ Edit</button>
                      <button
                        onClick={() => handleDeleteStudent(student._id)}
                        style={{ color: "red" }}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default ListStudent;
