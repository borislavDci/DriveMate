import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlassLocation,
  faRightToBracket,
  faTableColumns,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import PropTypes from "prop-types";
import NavItem from "./NavItem";
import HamburgerMenu from "./HamburgerMenu";

const navItems = [
  {
    name: "Home",
    icon: faHouse,
    pathname: "/",
    auth: false,
  },
  {
    name: "Browse Cars",
    icon: faMagnifyingGlassLocation,
    pathname: "/browse",
    auth: false,
  },
  {
    name: "Login",
    icon: faRightToBracket,
    pathname: "/login",
    auth: false,
  },
  {
    name: "Register",
    icon: faUserPlus,
    pathname: "/register",
    auth: false,
  },
  {
    name: "Dashboard",
    icon: faTableColumns,
    pathname: "/dashboard",
    auth: true,
  },
];

const Navbar = ({ user }) => {
  // State for whether the menu is open
  const [isOpen, setIsOpen] = useState(false);
  // Get the current location
  const location = useLocation();

  // Close the menu when the location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Function to toggle the menu open state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Navbar */}
      <nav className="flex gap-5 items-center flex-row-reverse md:flex-row md:justify-start">
        {/* Menu, shown/hidden based on isOpen state */}
        <div
          className={` ${
            isOpen
              ? "absolute right-0 top-20 bg-blue-500 h-min w-screen z-10 p-2 shadow-md border-t-2 border-blue-600 opacity-1 transition-all duration-500 ease-in-out"
              : "hidden"
          } flex gap-2 items-start justify-end md:flex `}
        >
          {/* Menu items */}
          <ul className="flex flex-col gap-2 items-end md:flex-row md:items-center">
            {navItems.map((item) => {
              if (
                (user && item.name === "Login") ||
                (user && item.name === "Register")
              )
                return null;

              if (!user && item.auth) return null;
              return (
                <NavItem
                  key={item.name}
                  title={item.name}
                  icon={item.icon}
                  pathname={item.pathname}
                />
              );
            })}
            <li>
              {/* Logout button for hambuger menu */}
              {user && <LogoutButton className="block md:hidden" />}
            </li>
          </ul>
        </div>
      </nav>
      {/* User profile and logout button */}
      <div className="flex gap-5 items-center flex-row-reverse md:flex-row">
        {/* Hamburger menu button */}
        <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        {user && (
          <>
            {/* User profile link */}
            <Link to="dashboard/profile">
              <FontAwesomeIcon
                className="hover:text-blue-800 text-2xl border-2 border-white rounded-full p-2 h-6 w-6 hover:border-blue-800"
                icon={faUser}
              />
            </Link>
            {/* Logout button for wider screens*/}
            <LogoutButton className="hidden md:block" />
          </>
        )}
      </div>
    </>
  );
};

Navbar.propTypes = {
  user: PropTypes.string,
};

export default Navbar;
