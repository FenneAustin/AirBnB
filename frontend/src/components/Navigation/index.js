import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className="nav-bar">
      <ul>
        <li className='home'>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li className='become-host'>
            <NavLink exact to='/become-a-host'>
              Become a Host
            </NavLink>
        </li>
        <li className='login-logout'>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
