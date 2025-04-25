import React, { useContext } from "react";
import { Container, Button } from "reactstrap";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";

function HomeCom() {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (state.role === 1) {
    return <Navigate to="/admin" replace />;
  } else if (state.role === 2) {
    return <Navigate to="/staff" replace />;
  } else if (state.role === 3) {
    return <Navigate to="/member" />;
  }

  return (
    <Container className="mt-5">
      <h1 className="display-3 mb-3">Selamat datang, {state.user}!</h1>
      <p className="lead">
        Senang bertemu denganmu kembali di <strong>SINAU App</strong> — platform
        belajar Bahasa Jawa yang menyenangkan dan mudah diakses.
      </p>
      <hr className="my-2" />
      <p>
        Jelajahi berbagai materi menarik, tingkatkan pemahamanmu, dan nikmati
        proses belajar dengan nyaman.
      </p>
      <Button color="primary">Pelajari Lebih Lanjut</Button>
    </Container>
  );
}

export default HomeCom;
