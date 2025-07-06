import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Register.css'; // Reuse same style
import sideImage from '../assets/bg.jpg';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/todo');
  };

  return (
    <Container className="register-container">
      <Row className="register-card">
        <Col md={6} className="d-none d-md-block p-0">
          <img src={sideImage} alt="Register visual" />
        </Col>
        <Col md={6} className="form-section">
          <h2 className="mb-3 text-center">Welcome Back 👋</h2>
          <p className="text-center mb-4">Login to your TaskNest account</p>

          <Form onSubmit={handleSubmit}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="loginEmail"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <label htmlFor="loginEmail">Email address</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="loginPassword"
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <label htmlFor="loginPassword">Password</label>
            </Form.Floating>

            <Button type="submit" className="w-100 mt-3 btn-primary">
              Login
            </Button>
            <p className="text-center mt-3">
              New here? <Link to="/">Create an account</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
