import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthService from "../Services/AuthService";
import { logOut } from "../store/reducers/authReducer";
import { useHistory } from "react-router";

// import sv from "../styles/variables";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  function logOutUser() {
    AuthService.signOut()
      .then((res) => {
        // console.log("Signed Out From API");
        dispatch(logOut());
        history.push("/login");
      })
      .catch((err) => {
        // console.log("Signed Out From API");
        dispatch(logOut());
        history.push("/login");
      });
  }

  return (
    <>
      <nav
        className={`relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow`}>
        <div className='w-full px-5 flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            {loggedIn && (
              <Link
                className={`focus:outline-none text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-gray-700`}
                to='/'>
                Home
              </Link>
            )}
            <button
              className={`text-gray-700 space-y-1 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none`}
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}>
              <div
                className={`w-6 h-0.5 bg-black transition-all duration-400 
                  ${
                    navbarOpen ? "transform rotate-45 translate-y-0.5" : ""
                  }`}></div>
              <div
                className={`w-6 h-0.5 bg-black transition-all duration-400"
                  ${
                    navbarOpen ? "transform -rotate-45 -translate-y-1" : ""
                  }`}></div>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id='example-navbar-danger'>
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              {!loggedIn && (
                <>
                  <li className='nav-item'>
                    <Link
                      className={`focus:outline-none px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75`}
                      to='/signup'>
                      <span className='ml-2'>Sign Up</span>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className={`focus:outline-none px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75`}
                      to='/login'>
                      <span className='ml-2'>Login</span>
                    </Link>
                  </li>
                </>
              )}
              {loggedIn && (
                <>
                  <li className='nav-item'>
                    <Link
                      className={`focus:outline-none px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75`}
                      to='/profile'>
                      <span className='ml-2'>Profile</span>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <button
                      className={`focus:outline-none px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75`}
                      onClick={logOutUser}>
                      <span className='ml-2'>Logout</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
