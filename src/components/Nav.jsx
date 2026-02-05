import React, { useState } from "react";
import "./Nav.scss";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";

const Nav = () => {
  

  return (
    <>
      {/* NAVBAR */}
      <nav>
        <NavLeft />
        <NavRight />
      </nav>

      
    </>
  );
};

export default Nav;
