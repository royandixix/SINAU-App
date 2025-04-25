import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";

const api = "http://localhost:3001";

function RegisterComp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSubmitting: false,
    errorMessage: null,
    successMessage: null,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ ...data, isSubmitting: true, errorMessage: null, successMessage: null });

    if (data.password !== data.confirmPassword) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: "password dan konfirmasi password tidak cocok.",
      });
      return;
    }

    const requestBody = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    axios
      .post(`${api}/auth/api/v1/register`, requestBody)
      .then((res) => {
        if (res.data.success) {
          setData({
            ...data,
            isSubmitting: false,
            successMessage: "Pendaftaran berhasil! Silakan cek email untuk verifikasi.",
          });
          // Redirect to login page after successful registration
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: "Terjadi kesalahan server.",
        });
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Registrasi</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel>Nama Pengguna</FormLabel>
              <FormControl
                type="text"
                name="username"
                placeholder="Masukkan nama pengguna"
                value={data.username}
                onChange={handleChange}
                required
              />
            </FormGroup>
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
            <FormGroup className="mb-3">
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl
                type="password"
                name="confirmPassword"
                placeholder="Konfirmasi password"
                value={data.confirmPassword}
                onChange={handleChange}
                required
              />
            </FormGroup>
            {data.errorMessage && (
              <Alert variant="danger">{data.errorMessage}</Alert>
            )}
            {data.successMessage && (
              <Alert variant="success">{data.successMessage}</Alert>
            )}
            <Button type="submit" disabled={data.isSubmitting}>
              {data.isSubmitting ? "Loading..." : "Daftar"}
            </Button>

            <div className="mt-6">
              <button color="primary" value={onabort}>
                masuk dan verifikasi anda sekarang 
              </button>
            </div>
          </Form>
          <p>Sudah punya akun? <Link to="/login">Login</Link></p>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterComp;
