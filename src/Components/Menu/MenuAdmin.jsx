import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import { AuthContext } from "../../App";

function MenuAdmin() {
//   const { dispatch } = useContext(AuthContext); // ✅ perbaikan typo
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">SINAU App</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/dashboard">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/transaksi">Transaksi</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/mahasiswa">Mahasiswa</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <Button color="success" onClick={() => alert("Logout berhasil!")}>
              LOGOUT
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MenuAdmin;
