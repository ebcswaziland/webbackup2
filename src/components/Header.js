import React from "react";
//import "../stylesheets/layout.css";
import { Link } from "react-router-dom";
import { FaBars, FaCartPlus, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { user } = JSON.parse(localStorage.getItem("currentUser"));
  // console.log("userqqqqqqqqqqqqqqqq " + user);
  const pollstation = localStorage.getItem("pollstation");
  const logouttext = "logout";

    const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("phone");
    localStorage.removeItem("pollstation");
    localStorage.removeItem("poll");
    localStorage.removeItem("TAB");

    window.location.reload();
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            <div >
              EBC RESULTS CAPTURING <span style={{ marginLeft: "70%", textAlign: 'center' }}>{pollstation.toUpperCase()}</span>
            </div>
          </Link>

          <div className="nav-item" style={{ marginLeft: "53%", fontSizeAdjust: '90px' }}>
            <Link className="nav-link" to="/" onClick={logout}>
              <div>
                {logouttext.toUpperCase()}
              </div>
            </Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <FaBars size={25} color="white" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {user && (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    <FaUser />{" "}
                    {user.email
                      ? user.email.substring(0, user.email.length - 10)
                      : user.phoneNumber}
                  </span>
                </li>
              </>
            )}

            {/* <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <FaUser /> {user.email.substring(0, user.email.length - 10)}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  logout
                </Link>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
