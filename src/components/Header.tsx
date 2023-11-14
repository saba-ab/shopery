import React from "react";
import headerImg from "../images/breadcumb.svg";
import homeImg from "../images/home-icon.svg";
import arrow from "../images/right-arrow.svg";
import "../styles/header.scss";
const Header = () => {
  return (
    <div className="header flex h-28 relative">
      <img src={headerImg} alt="header" className="header-img" />
      <div className="absolute top-1/2 left-28 -translate-y-1/2 text-gray-400 flex gap-2 ">
        <img src={homeImg} alt="home" /> <img src={arrow} alt="arrow" />{" "}
        <p>Categories</p>
      </div>
    </div>
  );
};

export default Header;
