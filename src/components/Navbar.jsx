import React from "react";
import { Link } from "react-router-dom";
import navbarcss from "./Navbar.module.css";


const Navbar = (props) => {
  return (
    <>
      <nav className={[navbarcss.navbar, "navbar navbar-expand-sm "].join(" ")}>
        <div className="container-fluid px-4 py-2">
          <Link
            className={[navbarcss.navbar_text, "navbar-brand"].join(" ")}
            to="/"
          >
            
          </Link>
          <div className="navbar-nav">
            {props.state && props.state.token && (
              <>
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </>
            )}
            {!props.state && (
              <Link
                className={[navbarcss.navbar_buttons, "nav-link"].join(" ")}
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
