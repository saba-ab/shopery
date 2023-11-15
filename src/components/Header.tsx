import React from "react";
import headerImg from "../images/breadcumb.svg";
import homeImg from "../images/home-icon.svg";
import arrow from "../images/right-arrow.svg";
import "../styles/header.scss";
interface Props {
  category: string;
}
const Header = ({ category }: Props) => {
  console.log(category);
  return (
    <div className="header flex h-28 relative">
      <img src={headerImg} alt="header" className="header-img" />
      <div className="header-cat absolute top-1/2 -translate-y-1/2 text-gray-400 flex gap-2 ">
        <img src={homeImg} alt="home" /> <img src={arrow} alt="arrow" />{" "}
        <p>Categories</p> <img src={arrow} alt="arrow" />
        {category}
      </div>
    </div>
  );
};

export default Header;
