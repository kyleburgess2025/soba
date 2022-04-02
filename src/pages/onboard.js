import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

function Onboard() {
  const [user, loading, error] = useAuthState(auth);
  const [selections, setSelections] = useState({});
  const [type, setType] = useState("admin");
  const [numRoommates, setNum] = useState(0);

  let tempObj = {};

  return (
    <div>
      <h1>welcome, {user.displayName.toLowerCase()}</h1>
      <h2>let's get acquainted before we get to the good stuff</h2>
      <p>what is your year?</p>
      <select
        onChange={(e) => {
          setType(e);
          tempObj.year = e;
        }}
      >
        <option>admin</option>
        <option>freshman</option>
        <option>sophomore</option>
        <option>junior</option>
        <option>senior</option>
      </select>
      {type === "admin" ? (
        <div>
          <Link to="/">submit</Link>
        </div>
      ) : (
        <div>
          <p>what is your gender?</p>
          <select
            onChange={(e) => {
              tempObj.gender = e;
            }}
          >
            <option>male</option>
            <option>female</option>
            <option>nonbinary</option>
            <option>other/prefer not to say</option>
          </select>
          <p>how many roommates do you plan to have next year?</p>
          <select
            onChange={(e) => {
              setNum(e);
            }}
          >
            <option>not sure</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
          </select>
          {numRoommates === 0 || numRoommates === "not sure" ? (
            <Link to="/">submit</Link>
          ) : (
            <div>
              <p>list the school email of each of your intended roommates:</p>
              <p>if a roommate has not joined soba, they will be invited over email</p>
              <p>(this is optional, but including roommates will help us compute your chances of getting your preferred room)</p>
              {Array.from(Array(numRoommates), (e, i) => {
                return (
                  <input
                    type="text"
                    key={i}
                    onChange={(e) => {
                      tempObj[`roommate${i}`] = e;
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Onboard;
