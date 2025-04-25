import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Button,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Row,
  Alert,
} from "react-bootstrap";
import { AuthContext } from "../App";
import ReCAPTCHA from "react-google-recaptcha"; // ✅ GANTI LIBRARY

const api = "http://localhost:3001";

function LoginComp() {
  const { dispatch } = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
    isVerified: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptcha = (value) => {
    console.log("Captcha value:", value);
    if (value) {
      setData((prev) => ({
        ...prev,
        isVerified: true,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.isVerified) {
      alert("Silakan selesaikan reCAPTCHA terlebih dahulu.");
      return;
    }

    setData({ ...data, isSubmitting: true, errorMessage: null });

    const requestBody = {
      email: data.email,
      password: data.password,
    };

    axios
      .post(`${api}/auth/api/v1/login`, requestBody)
      .then((res) => {
        if (res.data.success) {
          if (!res.data.isVerified) {
            setData({
              ...data,
              isSubmitting: false,
              errorMessage: "Akun belum diverifikasi. Silakan cek email Anda.",
            });
            return;
          }

          dispatch({
            type: "LOGIN",
            payload: {
              user: res.data.user,
              token: res.data.token,
              expires: res.data.expires,
              role: res.data.role,
            },
          });

          navigate("/dashboard");
        } else {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: res.data.message,
          });
        }
      })
      .catch((err) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage:
            err.response?.data?.message || "Terjadi kesalahan server.",
        });
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                name="email"
                placeholder="Masukkan email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <div className="mb-3">
              <ReCAPTCHA
                sitekey="6LeS9CMrAAAAANjTKp2o6hWvsfVVkxGJVe0vraxr"
                onChange={handleCaptcha}
              />
            </div>

            {data.errorMessage && (
              <Alert variant="danger">{data.errorMessage}</Alert>
            )}
            <Button
              className="mt-1 alert-dark"
              type="submit"
              disabled={data.isSubmitting}
            >
              {data.isSubmitting ? "Loading..." : "Login"}
            </Button>
          </Form>
          <p>
            Belum punya akun? <Link to="/register">Register</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginComp;
