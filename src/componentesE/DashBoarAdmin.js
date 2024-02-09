import React from "react";
import logo from "../img/logo.jpg";
import { Image } from "react-bootstrap";

const DashBoarAdmin = () => {
  return (
    <div className="navbarE d-flex justify-content-start align-items-center">
      <Image
        src={logo}
        className="rounded-circle me-1"
        alt=""
        width="70"
        height="70"
        style={{ margin: "-12px" }}
      />
      <h5 className="ml-2 mb-0">Mi enfermera favorita</h5>
    </div>
  );
};

export default DashBoarAdmin;
