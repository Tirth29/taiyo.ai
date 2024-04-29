import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-700 text-white lg:h-screen h-60 flex flex-col">
      <h1 className="text-center my-7 font-bold text-3xl text-yellow-400">
        Taiyo
      </h1>
      <NavItem to="/" exact>
        Contact
      </NavItem>
      <NavItem to="/charts">Charts and Maps</NavItem>
    </div>
  );
};

const NavItem: React.FC<{ to: string; exact?: boolean }> = ({
  children,
  to,
  exact,
}) => {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <div className={`relative ${isActive ? "bg-gray-600" : ""} rounded-lg m-3`}>
      <NavLink
        to={to}
        className={`mx-5 font-semibold text-lg block py-2 px-4 ${
          isActive ? "text-green-400" : "text-white"
        }`}
      >
        {children}
      </NavLink>
    </div>
  );
};

export default Sidebar;
