import React from 'react';
import { Link } from "react-router";
import logo from "/foodloverlogo.png";
const textStyle =
  "text-2xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";

const Logo = () => {
    return (
      <div>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Food Lovers" className="w-7 h-7" />
          <h1 className={textStyle}>Food Lovers</h1>
        </Link>
      </div>
    );
};

export default Logo;