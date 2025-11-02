import React from "react";
import "./App.css";
import StudentForm from "./components/StudentForm/StudentForm";
import ListStudent from "./components/ListStudent/ListStudent";

const App = () => {
  return (
    <div className="app-wrapper">
      <h1 className="title">Student Record Portal</h1>
      <StudentForm />
      <ListStudent />
    </div>
  );
};

export default App;
