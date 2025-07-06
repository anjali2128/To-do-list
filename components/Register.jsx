import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import sideImage from '../assets/bg.jpg';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom'; // ✅ add useNavigate

function Register() {
  const navigate = useNavigate(); // ✅ React Router navigation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    navigate('/todo'); // ✅ go to TaskNest page
  };

  return (
    <Container className="register-container">
      <Row className="register-card">
        <Col md={6} className="d-none d-md-block p-0">
          <img src={sideImage} alt="Register visual" />
        </Col>
        <Col md={6} className="form-section">
          <h2 className="mb-3 text-center">Join TaskNest</h2>
          <p className="text-center mb-4">
            Sign up and start conquering your tasks beautifully 🌟
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Form.Control
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <Button type="submit" className="w-100 mt-2 btn-primary">
              Create Account
            </Button>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
