import React from "react";
import { Link } from "react-router-dom";
import sv from "../styles/variables";

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className={`relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-${sv.primary}`}>
        <div className="w-full px-5 flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className={`focus:outline-none text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-${sv.secondary}`}
              to="/"
            >
              Medical Mnemonics
            </Link>
            <button
              className={`text-${sv.secondary} space-y-1 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none`}
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <div
                className={
                  `w-6 h-0.5 bg-white transition-all duration-400 
                  ${navbarOpen ? "transform rotate-45 translate-y-0.5" : ""}`
                }
              ></div>
              <div
                className={
                  `w-6 h-0.5 bg-white transition-all duration-400"
                  ${navbarOpen ? "transform -rotate-45 -translate-y-1" : ""}`
                }
              ></div>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className={`focus:outline-none px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-${sv.secondary} hover:opacity-75`}
                  to="/contributions"
                >
                  <span className="ml-2">Contribute</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`focus:outline-none px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-${sv.secondary} hover:opacity-75`}
                  to="/contributors"
                >
                  <span className="ml-2">Contributors</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`focus:outline-none px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-${sv.secondary} hover:opacity-75`}
                  to="/contact-us"
                >
                  <span className="ml-2">Contact Us</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`focus:outline-none px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-${sv.secondary} hover:opacity-75`}
                  to="/about-us"
                >
                  <span className="ml-2">About Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
