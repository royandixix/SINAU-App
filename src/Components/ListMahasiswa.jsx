import React, { useContext, useEffect, useState } from "react";
import { Container, Button } from "reactstrap";
import axios from "axios";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom"; // ✅ Ganti Redirect dengan Navigate

const api = 'http://localhost:3001';

function ListMahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      };

      axios.get(api + '/auth/api/v1/admin/mahasiswa', config)
        .then(res => {
          setMahasiswa(res.data.values);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const timeout = () => {
      setTimeout(() => {
        console.log("Token Telah Berakhir");
        dispatch({ type: "LOGOUT" });
      }, state.tokenExpires);
    };

    if (state.token) {
      console.log("Token di context:", state.token); // debug
      fetchData();
      timeout();
    }
  }, [state.token, state.tokenExpires, dispatch]);

  // Jika belum login, arahkan ke halaman login
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container>
      <h2 className=" mt-3">Data Mahasiswa</h2>
      <hr />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Jurusan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((m) => (
            <tr key={m.id_mahasiswa}>
              <td>{m.nim}</td>
              <td>{m.nama}</td>
              <td>{m.jurusan}</td>
              <td>
                <Button>Edit</Button>{' '}
                <Button color="danger">Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default ListMahasiswa;
