import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";

const Student = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students data from API
    axios
      .get("http://127.0.0.1:8000/api/student")
      .then((response) => {
        setStudents(response.data.students);
      })
      .catch((error) => {
        console.error("There was an error fetching the students!", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Handle delete student
    console.log("Delete student with id:", id);
  };

  const handleEdit = (id) => {
    // Handle edit student
    console.log("Edit student with id:", id);
  };

  const handleDetails = (id) => {
    // Handle view student details
    console.log("View details of student with id:", id);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Students List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{`${student.first_name} ${student.last_name}`}</td>
              <td>{student.gender}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.course}</td>
              <td>
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => handleDetails(student.id)}
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> Details
                </Button>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => handleEdit(student.id)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(student.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Student;
