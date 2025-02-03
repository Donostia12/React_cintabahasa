import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

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
    axios
      .get("http://127.0.0.1:8000/api/country")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the countries data!", error);
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
    axios
      .put(`http://127.0.0.1:8000/api/student/edit/${id}`, student)
      .then((response) => {
        console.log("Student updated successfully:", response.data);
        // Redirect to the dashboard or another page if needed
      })
      .catch((error) => {
        console.error("There was an error updating the student data!", error);
      });
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
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastName" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={student.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGender" className="mt-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="gender_id"
            value={student.gender_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="13">Male</option>
            <option value="14">Female</option>
            <option value="15">Non-Binary</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formCountry" className="mt-3">
          <Form.Label>Country</Form.Label>
          <Form.Select
            name="country_id"
            value={student.country_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.country_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCourse" className="mt-3">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="number"
            name="course_id"
            value={student.course_id}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditStudent;
