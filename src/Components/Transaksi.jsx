import React, { useContext } from 'react'; // <-- tambahkan useContext
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App'; // Pastikan konteksnya benar dan tersedia di App.jsx
import { Container, Button } from 'reactstrap';

function Transaksi() {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="mt-5">
      <h1 className="display-4 mb-3">Transaksi</h1>
      <p className="lead">Kelola semua riwayat dan aktivitas transaksi kamu di sini.</p>
      <hr className="my-2" />
      <p>Lihat detail pembayaran, status transaksi, dan catatan lainnya dengan mudah.</p>
      <Button color="primary">Lihat Riwayat</Button>
    </Container>
  );
}

export default Transaksi;
