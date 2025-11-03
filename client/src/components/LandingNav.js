import React from "react";
import { TiThMenu } from "react-icons/ti";
import { useGlobalContext } from "../context/UserContext";
import WelcomeBanner from "./WelcomeBanner";
import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  Navbar,
} from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
const LandingNav = () => {
  const { toggleNav } = useGlobalContext();
  const nav = [
    { name: "home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "register an account", path: "/register" },
    // { name: "our services", path: "/services" },
    { name: "price list", path: "/priceList" },
  ];
  const navigate = useNavigate();
  return (
    <Navbar
      className="fixed left-0 right-0 top-0 z-20 bg-white"
      // className="fixed left-0 right-0 top-0 z-20 bg-[var(--primary-400)]"
      fluid
      rounded
    >
      <Navbar.Brand href="/">
        <img src="/assets/logo.jpg" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowraps text-[var(--primary-600)] text-3xl font-semibold dark:text-white capitalize">
          dataSpin
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {/* <div className="btn mr-2">
          <Button
            color="btn"
            className="btn mr-2"
            onClick={() => navigate("/register")}
            // className="btn mr-2 bg-[var(--primary-900)]"
          >
            Get started
          </Button>
        </div> */}

        {/* <DarkThemeToggle /> */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/register"
            className="px-6 py-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Get started
          </Link>
        </div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {nav.map((e, index) => {
          return (
            <>
              <Navbar.Link className="capitalize p-4  ">
                <NavLink
                  to={e.path}
                  key={index}
                  // onClick={toggleNav}
                  className={({
                    isActive,
                    // }) => `text-lg text-[var(--primary-400)] p-4 capitalize hover:border-b-2 hover:shadow-md hover:bg-[var(--primary-700)] hover:text-white border-none rounded-md
                  }) => `text-lg text-[var(--primary-600)] p-4 capitalize hover:border-b-2 hover:text-[var(--primary-400)] border-none rounded-md
                  ${isActive ? " active" : "nav__btn"}`}
                >
                  {e.name}
                </NavLink>
              </Navbar.Link>
            </>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LandingNav;
