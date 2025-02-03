import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/student/edit/${id}`)
      .then((response) => {
        setStudent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the student data!", error);
        setError("Failed to fetch student data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submit to update student data
    console.log("Updated student data:", student);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Student</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={student.first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formLastName" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={student.last_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={student.phone}
            onChange={handleChange}
          />
        </Form.Group>
        {/* Add other form fields as needed */}
        <Button variant="primary" type="submit" className="mt-3">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditStudent;
