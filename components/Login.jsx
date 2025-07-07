import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Register.css'; // Reuse same styles
import sideImage from '../assets/bg.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    toast.success('Logged in successfully!');

    setTimeout(() => {
      setLoading(false);
      navigate('/todo');
    }, 1200);
  };

  return (
    <Container className="register-container">
      <Row className="register-card">
        <Col md={6} className="d-none d-md-block p-0">
          <img src={sideImage} alt="Login visual" />
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
              {formData.email && !validateEmail(formData.email) && (
                <div className="text-danger small mt-1">Invalid email format.</div>
              )}
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
              {formData.password && formData.password.length < 6 && (
                <div className="text-danger small mt-1">Minimum 6 characters required.</div>
              )}
            </Form.Floating>

            <Button type="submit" className="w-100 mt-3 btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <p className="text-center mt-3">
              New here? <Link to="/">Create an account</Link>
            </p>
          </Form>

          <ToastContainer position="top-center" autoClose={2000} theme="colored" />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
