import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, signOut } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/onboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <img id="icon" src={require("./assets/icon.png")} alt="icon" />
        <h1 className="signin">sign in</h1>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          login with Google
        </button>
      </div>
    </div>
  );
}
export default Login;
