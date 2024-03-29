import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FireBase";
import Cookies from "universal-cookie";
import "@material/web/iconbutton/outlined-icon-button.js";
import "@material/web/iconbutton/filled-tonal-icon-button.js";
import { useState, useEffect } from "react";
import LogoutIcone from "../assets/logout_icon.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Nav = (props) => {
  const login = props.login;
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const emailCookie = cookies.get("email");


 
  const handleLogout = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      auth.signOut().then(() => {
        console.log("Logged out successfully");
        cookies.remove("email");
        cookies.remove("uid");
        navigate("/", { replace: true, state: { from: location } });
      });
    });
    unsubscribe();
  };

  const handlenavigation = (destination) => {
    navigate(`/${destination}`, { state: { from: location } });
  };


  return (
    <div id="nav">

      <div>
        <span id="logo">ue</span>
        {props.admin ? (
          <span id="logoadmin"> Admin</span>
        ) : (
          <span onClick={() => handlenavigation("")}> Uni Event</span>
        )}
      </div>

      
      <div>
        {emailCookie !== undefined ? (
          <md-outlined-icon-button onClick={() => handleLogout()}>
            <md-icon>
              <img src={LogoutIcone} alt="Logout" />
            </md-icon>
          </md-outlined-icon-button>
        ) : props.login ? (
          <div>
            <button id="nav-login" onClick={()=>handlenavigation("user-auth")}>
              Log in
            </button>
          </div>
        ) : null}

        {props.admin ? (
          <button id="nav-login" onClick={()=>handlenavigation("")}>
            X
          </button>
        ) : null}

        {props.user ? (
          <button id="nav-login" onClick={()=>handlenavigation("")}>
            X
          </button>
        ) : null}

      </div>








    </div>
  );
};

export default Nav;
