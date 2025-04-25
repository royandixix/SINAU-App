import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

function MenuPublik() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">SINAU App</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="me-auto" navbar>
            {/* Tambah menu publik jika perlu */}
          </Nav>
          <NavbarText>
            <RRNavLink to="/login" className="nav-link text-white">
              LOGIN
            </RRNavLink>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MenuPublik;
