import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    reason: "",
    questions: "",
    gender: "",
    country: "",
    email: "",
    location_now: "",
    course: "",
    phone_code: "",
    phone: "",
    location: "",
    NewsLatter: "",
    starting_date: "",
    payment_preference: "",
    referrer: "", // updated name to be consistent
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [referrers, setreferrer] = useState([]); // updated variable name to be consistent

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
          reason: studentData.reason,
          payment_preference: studentData.payment_preference_id,
          referrer: studentData.referrer_id,
          questions: studentData.message,
          NewsLatter: studentData.newsletter,
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

    axios
      .get("http://127.0.0.1:8000/api/dashboard/preference") // updated endpoint
      .then((response) => {
        console.log(response.data);
        setPreferences(response.data); // updated variable name to be consistent
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the preferences data!",
          error
        ); // updated variable name to be consistent
      });
    axios
      .get("http://127.0.0.1:8000/api/dashboard/referrer-json") // updated endpoint
      .then((response) => {
        setreferrer(response.data); // updated variable name to be consistent
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the preferences data!",
          error
        ); // updated variable name to be consistent
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
    axios
      .post(`http://127.0.0.1:8000/api/student/update/${id}`, student)
      .then((response) => {
        navigate("/student");
      })
      .catch((error) => {
        console.error("There was an error updating the student data!", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setFormErrors(error.response.data.errors);
        }
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
          {formErrors.firstName && (
            <Alert variant="danger">{formErrors.firstName[0]}</Alert>
          )}
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
          {formErrors.lastName && (
            <Alert variant="danger">{formErrors.lastName[0]}</Alert>
          )}
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
          {formErrors.gender && (
            <Alert variant="danger">{formErrors.gender[0]}</Alert>
          )}
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
          {formErrors.country && (
            <Alert variant="danger">{formErrors.country[0]}</Alert>
          )}
        </Form.Group>
        <Form.Group controlId="location_now" className="mt-3">
          <Form.Label>Where Are you located now?</Form.Label>
          <Form.Select
            name="location_now"
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
          {formErrors.location_now && (
            <Alert variant="danger">{formErrors.location_now[0]}</Alert>
          )}
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
          {formErrors.email && (
            <Alert variant="danger">{formErrors.email[0]}</Alert>
          )}
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
          {formErrors.phone && (
            <Alert variant="danger">{formErrors.phone[0]}</Alert>
          )}
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
          {formErrors.course && (
            <Alert variant="danger">{formErrors.course[0]}</Alert>
          )}
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
          {formErrors.location && (
            <Alert variant="danger">{formErrors.location[0]}</Alert>
          )}
        </Form.Group>
        <Form.Group controlId="formDate" className="mt-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="starting_date" // updated name to match state
            value={student.starting_date}
            onChange={handleChange}
            required
          />
          {formErrors.starting_date && (
            <Alert variant="danger">{formErrors.starting_date[0]}</Alert>
          )}
        </Form.Group>
        <Form.Group controlId="payments" className="mt-3">
          <Form.Label>Payment preference</Form.Label>
          <Form.Select
            name="payment_preference" // updated name to match state
            value={student.payment_preference} // updated value to match state
            onChange={handleChange}
            required
          >
            <option value="">Select payments</option>
            {preferences.map((preference) => (
              <option key={preference.id} value={preference.id}>
                {preference.term}
              </option>
            ))}
          </Form.Select>
          {formErrors.payment_preference && (
            <Alert variant="danger">{formErrors.payment_preference[0]}</Alert>
          )}
        </Form.Group>
        <Form.Group controlId="referrer" className="mt-3">
          <Form.Label>Referrer</Form.Label>
          <Form.Select
            name="referrer"
            value={student.referrer}
            onChange={handleChange}
            required
          >
            <option value="">Select referrer</option>
            {referrers.map((referrer) => (
              <option key={referrer.id} value={referrer.id}>
                {referrer.term}
              </option>
            ))}
          </Form.Select>
          {formErrors.referrer && (
            <Alert variant="danger">{formErrors.referrer[0]}</Alert>
          )}
        </Form.Group>
        <Form.Group controlId="formletter" className="mt-3">
          <Form.Label>NEWS Latter</Form.Label>
          <Form.Select
            name="newsletter"
            value={student.newsletter} // Jika null, set ke "0"
            onChange={handleChange}
            required
          >
            <option value="">Select News Letter</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </Form.Select>
          {formErrors.newsletter && (
            <Alert variant="danger">{formErrors.newsletter[0]}</Alert>
          )}
        </Form.Group>

        <Form.Group controlId="formreason" className="mt-3">
          <Form.Label>Why You like to learn with Us</Form.Label>
          <Form.Control
            type="text"
            name="reason"
            value={student.reason}
            onChange={handleChange}
            required
          />
          {formErrors.reason && (
            <Alert variant="danger">{formErrors.reason[0]}</Alert>
          )}
        </Form.Group>
        <Form.Group controlId="formquestions" className="mt-3">
          <Form.Label>Questions</Form.Label>
          <Form.Control
            type="text"
            name="questions"
            value={student.questions}
            onChange={handleChange}
            required
          />
          {formErrors.questions && (
            <Alert variant="danger">{formErrors.questions[0]}</Alert>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditStudent;
