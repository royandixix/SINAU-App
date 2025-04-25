import React, { useContext, useState } from "react";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   NavbarText,
//   Button,
// } from "reactstrap";
// import { NavLink as RRNavLink } from "react-router-dom"; // ✅ Tambahan penting
import { AuthContext } from "../App";
import MenuPublik from "./Menu/MenuPublik";
import MenuMember from "./Menu/MenuMember";
import MenuAdmin from "./Menu/MenuAdmin";
import MenuStaff from "./Menu/MenuStaff";
function MenuComp() {
  const { state } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(true); // Optional kalau toggle navbar dipakai
  const toggleNavbar = () => setCollapsed(!collapsed); // Optional juga

  if (!state.isAuthenticated) {
    return <MenuPublik />;
  }

  if (state.role === 1) {
    return <MenuAdmin />;
  } else if (state.role === 2) {
    return <MenuStaff />;
  }

  return <MenuMember />;
}

export default MenuComp;
//   if (!state.isAuthenticated) {
//     return (
//       <MenuPublik/>
// //       <div>
// //         <Navbar color="dark" dark expand="md">
// //           <NavbarBrand href="/">SINAU App</NavbarBrand>
// //           <NavbarToggler onClick={toggleNavbar} />
// //           <Collapse isOpen={!collapsed} navbar>
// //             <Nav className="me-auto" navbar>
// //               <NavItem>
// //                 {/* <NavLink href="/components">Components</NavLink> */}
// //               </NavItem>
// //             </Nav>
// //             <NavbarText>
// //               <NavLink tag={RRNavLink} to="/login">
// //                 LOGIN
// //               </NavLink>
// //               {/* <Button 
// //   color='default'
// //   onClick={() => 
// //     dispatch({
// //       type: "LOGOUT"
// //     })
// //   }
// // >
// //   LOGOUT
// // </Button> */}
// //             </NavbarText>
// //           </Collapse>
// //         </Navbar>
// //       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar color="dark" dark expand="md">
//         <NavbarBrand href="/">SINAU App</NavbarBrand>
//         <NavbarToggler onClick={toggleNavbar} />
//         <Collapse isOpen={!collapsed} navbar>
//           <Nav className="me-auto" navbar>
//             <NavItem>
//               <NavLink tag={RRNavLink} to="/dashboard" className="nav-link">
//                 Home
//               </NavLink>
//               {/* <NavLink href="/components">Components</NavLink> */}
//             </NavItem>
//             <NavItem>
//               <NavLink tag={RRNavLink} to="/transaksi" className="nav-link">
//                 Transaksi
//               </NavLink>
//               {/* <NavLink href="/components">Components</NavLink> */}
//             </NavItem>
//             <NavItem>
//               <NavLink tag={RRNavLink} to="/mahasiswa" className="nav-link">
//                 mahasiswa
//               </NavLink>
//             </NavItem>
//           </Nav>
//           <NavbarText>
//             <Button
//               color="success"
//               size="sm"
//               className="fw-semibold px-3 py-1"
//               onClick={() =>
//                 dispatch({
//                   type: "LOGOUT",
//                 })
//               }
//             >
//               LOGOUT
//               {/* {state.isAuthenticated && (
//                     <NavLink>LOGOUT</NavLink>
//                 )} */}
//             </Button>
//           </NavbarText>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// }

// export default MenuComp;
