import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import sideImage from '../assets/bg.jpg';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return 'Weak';
    if (score <= 4) return 'Medium';
    return 'Strong';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Enter a valid email address');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.agree) {
      toast.error('You must agree to the Terms & Conditions');
      return;
    }

    setLoading(true);
    toast.success('Account created successfully!');
    setTimeout(() => {
      setLoading(false);
      navigate('/todo');
    }, 1500);
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
            <Form.Floating className="mb-3">
              <Form.Control
                id="registerName"
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <label htmlFor="registerName">Full Name</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="registerEmail"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <label htmlFor="registerEmail">Email address</label>
              {formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (
                <div className="text-danger small mt-1">Please enter a valid email.</div>
              )}
            </Form.Floating>

            <div className="mb-3 position-relative">
              <Form.Floating>
                <Form.Control
                  id="registerPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <label htmlFor="registerPassword">Password</label>
              </Form.Floating>
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                role="button"
                aria-label="Toggle password visibility"
                tabIndex={0}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </span>
              {formData.password && (
                <div className="mt-1 small text-muted">
                  Strength: <strong>{getPasswordStrength(formData.password)}</strong>
                </div>
              )}
            </div>

            <div className="mb-3 position-relative">
              <Form.Floating>
                <Form.Control
                  id="registerConfirm"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
                <label htmlFor="registerConfirm">Confirm Password</label>
              </Form.Floating>
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                role="button"
                aria-label="Toggle confirm password visibility"
                tabIndex={0}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <BsEyeSlash /> : <BsEye />}
              </span>
            </div>

            <Form.Check
              type="checkbox"
              id="agreeTerms"
              label="I agree to the Terms & Conditions"
              className="mb-3"
              checked={formData.agree}
              onChange={(e) =>
                setFormData({ ...formData, agree: e.target.checked })
              }
              required
            />

            <Button type="submit" className="w-100 mt-2 btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </Button>

            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </Form>

          <ToastContainer position="top-center" autoClose={2000} theme="colored" />
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
