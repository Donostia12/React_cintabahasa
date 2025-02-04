import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const EditStudent = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    country: "",
    email: "",
    location_now: "",
    course: "",
    phone_code: "",
    phone: "",
    location: "",
    starting_date: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/student/edit/${id}`)
      .then((response) => {
        const studentData = response.data;
        setStudent({
          firstName: studentData.first_name,
          lastName: studentData.last_name,
          gender: studentData.gender_id,
          country: studentData.country_id,
          location_now: studentData.located_now_id,
          email: studentData.email,
          course: studentData.course_id,
          phone_code: studentData.phone_code,
          phone: studentData.phone,
          location: studentData.location_id,
          starting_date: studentData.starting_date,
        });
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
    axios
      .get("http://127.0.0.1:8000/api/dashboard/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses data!", error);
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
      .post(`http://127.0.0.1:8000/api/student/update/${id}`, student)
      .then((response) => {
        // Redirect to the dashboard or another page if needed
        navigate("/student");
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
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastName" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGender" className="mt-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="gender"
            value={student.gender}
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
            name="country"
            value={student.country}
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
        <Form.Group controlId="location_now" className="mt-3">
          <Form.Label>Where Are you located now?</Form.Label>
          <Form.Select
            name="country"
            value={student.location_now}
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
        <Form.Group controlId="phone" className="mt-3">
          <Form.Label>Phone </Form.Label>
          <Form.Group
            controlId="formPhone"
            className="mt-3 d-flex align-items-center"
          >
            <Form.Control
              type="text"
              name="phone_code"
              value={student.phone_code}
              readOnly
              className="me-2"
              style={{ width: "50px" }}
            />
            <Form.Control
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="formCourse" className="mt-3">
          <Form.Label>Course</Form.Label>
          <Form.Select
            name="course"
            value={student.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formlocation" className="mt-3">
          <Form.Label>Course Location</Form.Label>
          <Form.Select
            name="location"
            value={student.location}
            onChange={handleChange}
            required
          >
            <option value="">Select Course Location</option>
            <option value="11">Sanur</option>
            <option value="12">UBUD</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formDate" className="mt-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={student.starting_date}
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
