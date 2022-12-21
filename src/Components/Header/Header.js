import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import "./Header.css";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-slate-700 text-white flex justify-center items-center">
      <ul className="flex justify-center items-center my-5">
        <li>
          <Link to="register">Register</Link>
          {user?.name}
        </li>
        <li>
          <Link to="login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
