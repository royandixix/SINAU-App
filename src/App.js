import React, { useReducer, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MenuComp from "./Components/MenuComp";
import LoginComp from "./Components/LoginComp";
import HomeCom from "./Components/HomeCom";
import RegisterComp from "./Components/RegisterComp";
import Transaksi from "./Components/Transaksi";
import Public from "./Components/Public";
import ListMahasiswa from "./Components/ListMahasiswa";
import RoleAdmin from './Components/RoleAkses/RoleAdmin'
import RoleStaff from './Components/RoleAkses/RoleMember'
import RoleMember from './Components/RoleAkses/RoleStaff';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpires: 0,
  role: "" // ✅ nilai default ditambahkan
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        tokenExpires: action.payload.expires, // ✅ koma ditambahkan
        role: action.payload.role
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        tokenExpires: 0,
        role: ""
      };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ state, dispatch }}>
        <MenuComp />

        <Routes>
          <Route
            path="/"
            element={
              !state.isAuthenticated ? (
                <Public />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route path="/login" element={<LoginComp />} />
          <Route path="/dashboard" element={<HomeCom />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/register" element={<RegisterComp />} />
          <Route path="/mahasiswa" element={<ListMahasiswa />} />
          <Route path="/admin" element={<RoleAdmin />} />
          <Route path="/staff" element={<RoleStaff />} />
          <Route path="/member" element={<RoleMember />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
