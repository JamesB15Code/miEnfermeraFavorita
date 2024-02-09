import React from "react";
import "../css/navbarE.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faBagShopping,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebarE bg-light">
      <div>
        <ul>
          <li>
            <NavLink
              to="/inicioAdmin"
              exact
              className="text-dark rounded py-2 w-100 d-inline-block px-3"
              activeClassname="active"
            >
              <FontAwesomeIcon icon={faHouse} className="me-3" />
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ventasEmpleado"
              exact
              className="text-dark rounded py-2 w-100 d-inline-block px-3"
              activeClassname="active"
            >
              <FontAwesomeIcon icon={faBagShopping} className="me-3" />
              Ventas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clientesEmpleado"
              exact
              className="text-dark rounded py-2 w-100 d-inline-block px-3"
              activeClassname="active"
            >
              <FontAwesomeIcon icon={faUser} className="me-3" />
              Clientes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/productosEmpleado"
              exact
              className="text-dark rounded py-2 w-100 d-inline-block px-3"
              activeClassname="active"
            >
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Productos
            </NavLink>
          </li>
        </ul>
      </div>
      <div className=" ">
        <ul>
          <li>
            <NavLink
              to="/configuracion"
              exact
              className="text-dark rounded py-2 w-100 d-inline-block px-3"
              activeClassname="active"
            >
              <FontAwesomeIcon icon={faCog} className="me-3" />
              Config
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cerrarSesion"
              exact
              className="text-dark rounded py-2 w-100 d-inline-block px-3"
              activeClassname="active"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="me-3" />
              Log Ut
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
