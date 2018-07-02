import React from "react";
import footerStyle from "./Footer.css"

const Footer = () => (
  <nav
    className="navbar fixed-bottom navbar-dark bg-dark navbar-expand-sm"
    data-toggle="affix"
    style={footerStyle}
  >
    <div className="mx-auto d-sm-flex d-block flex-sm-nowrap">
      {/* <a className="navbar-brand" href="/">
        roam
      </a> */}
      {/* <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample11"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button> */}
      <div className="text-center">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="#">SEARCH</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">HOME</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">SAVED</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">LOGIN</a>
                </li>
            </ul>
        </div>
    </div>
  </nav>
);

export default Footer;
