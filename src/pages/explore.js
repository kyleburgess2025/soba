import React from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./dashboard.css";

const Explore = () => {
  const [user, loading, error] = useAuthState(auth);

  return <h1>hello, {user.displayName}</h1>;
};

export default Explore;
