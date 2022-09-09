import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import "./ProfileButton.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="flyout" onClick={openMenu}>
        <i className="fa-sharp fa-solid fa-bars hamburger" />
        <img
          className="default-profile"
          src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt=""
        />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="users-email">{user.email}</li>
          <li className="Home-btn-link">
            <NavLink to="/" style={{ textDecoration: "none" }}>
              Home
            </NavLink>
          </li>
          {/* <li className="my-bookings-link">
            <NavLink to="/" style={{ textDecoration: "none" }}>
              My Bookings
            </NavLink>
          </li> */}
          {/* <li className="my-spots-link">
            <NavLink to="/" style={{ textDecoration: "none" }}>
              My Spots
            </NavLink>
          </li> */}
          <li className="flyout-logout-btn">
            <button onClick={logout} className="profile-btn-logout">
              Log Out
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
