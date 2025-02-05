import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faInfoCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Student = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;
  const navigate = useNavigate();
  useEffect(() => {
    fetchStudents();
  }, [keyword, page]);

  const fetchStudents = () => {
    axios
      .get("https://cintabahasa.devdonos.pro/api/student", {
        params: {
          keyword,
          page,
          limit,
        },
      })
      .then((response) => {
        setStudents(response.data.students);
        setTotal(response.data.total);
      })
      .catch((error) => {
        console.error("There was an error fetching the students!", error);
      });
  };

  const handleDelete = (id) => {
    // Handle delete student
    console.log("Delete student with id:", id);
  };

  const handleEdit = (id) => {
    // Navigate to edit student page with the student ID
    navigate(`/student/edit/${id}`);
  };

  const handleDetails = (student) => {
    // Set selected student and show modal
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleNextPage = () => {
    if (page * limit < total) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Students List</h2>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button
            variant="secondary"
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="me-2"
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNextPage}
            disabled={page * limit >= total}
          >
            Next
          </Button>
        </div>
        <Form.Control
          type="text"
          placeholder="Search Your Student"
          value={keyword}
          onChange={handleSearch}
          className="me-2"
          style={{ maxWidth: "300px" }}
        />
      </div>
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
                  onClick={() => handleDetails(student)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for student details */}
      {selectedStudent && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Student Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>ID:</strong> {selectedStudent.id}
            </p>
            <p>
              <strong>Name:</strong>{" "}
              {`${selectedStudent.first_name} ${selectedStudent.last_name}`}
            </p>
            <p>
              <strong>Gender:</strong> {selectedStudent.gender}
            </p>
            <p>
              <strong>Nationality:</strong> {selectedStudent.country}
            </p>
            <p>
              <strong>Where Are You Now:</strong> {selectedStudent.location_now}
            </p>
            <p>
              <strong>Email:</strong> {selectedStudent.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedStudent.phone}
            </p>

            <p>
              <strong>Course:</strong> {selectedStudent.course}
            </p>

            <p>
              <strong>Location:</strong> {selectedStudent.course_location}
            </p>
            <p>
              <strong>Starting At :</strong> {selectedStudent.starting_at}
            </p>
            <p>
              <strong>Payment Preference:</strong>
              {selectedStudent.payment_preference}
            </p>
            <p>
              <strong>referrer : </strong> {selectedStudent.referrer}
            </p>
            <p>
              <strong>News Letter :</strong>
              {selectedStudent.newsletter === 1 ? "Yes" : "No"}
            </p>

            <p>
              <strong> why would you like to learn with us? :</strong>{" "}
              {selectedStudent.reason}
            </p>
            <p>
              <strong>Note:</strong> {selectedStudent.note}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Student;
