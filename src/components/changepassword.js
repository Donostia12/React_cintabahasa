import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New Password and Confirm Password do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.cintabahasa.com/api/change-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          newPassword_confirmation: formData.confirmPassword,
        }
      );

      setSuccess(response.data.message);
      setError(null);
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while changing the password");
      }
      setSuccess(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Change Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formOldPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formNewPassword" className="mt-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword" className="mt-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {error && <p className="text-danger mt-3">{error}</p>}
        {success && <p className="text-success mt-3">{success}</p>}
        <Button variant="primary" type="submit" className="mt-3">
          Change Password
        </Button>
      </Form>
    </div>
  );
};

export default ChangePassword;
