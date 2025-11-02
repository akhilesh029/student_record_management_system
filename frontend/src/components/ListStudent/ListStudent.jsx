import axios from "axios";
import React, { useEffect, useState } from "react";
import './ListStudent.css'

const API_URL = import.meta.env.VITE_API_URL;

const ListStudent = () => {
  const [data, setData] = useState([]);

  // Fetch all students
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/students`);
        setData(response.data.data); // assuming { data: [ ...students ] }
        console.log(response.data.data);
      } catch (error) {
        console.error("Error occurred during fetch:", error);
      }
    };
    fetchData();
  }, []);

  // Delete student by ID
  const handleDeleteStudent = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/student/${id}`);
      console.log("Deleted:", response.data);

      // Instantly remove from UI
      setData((prevData) => prevData.filter((student) => student._id !== id));

    } catch (error) {
      console.error("Error deleting student:", error);
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>{student.course}</td>
                <td>{student.marks}</td>
                <td>
                  <button
                    onClick={() => handleDeleteStudent(student._id)}
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    Delete
                  </button>
                </td>
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
