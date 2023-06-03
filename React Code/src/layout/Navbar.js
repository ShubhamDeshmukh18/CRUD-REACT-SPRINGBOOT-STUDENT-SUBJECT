import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            CRUD Operation React-Springboot
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="btn btn-outline-light" to="/addsubject">
            Add Subject
          </Link>
          <Link className="btn btn-outline-light" to="/subjecthome">
            Subject Home Page
          </Link>
          <Link className="btn btn-outline-light" to="/">
            User Home Page
          </Link>
          <Link className="btn btn-outline-light" to="/adduser">
            Add User
          </Link>
        </div>
      </nav>
    </div>
  );
}
