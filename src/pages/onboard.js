import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import "./onboard.css";

import Axios from 'axios';

function Onboard() {
  const [user, loading, error] = useAuthState(auth);
  const [selections, setSelections] = useState();
  const [year, setYear] = useState("admin");
  const [gender, setGender] = useState("male");
  const [school, setSchool] = useState("Vanderbilt");
  const [numRoommates, setNum] = useState(0);

  let tempObj = { year: "admin" };

  const onSubmit = () => {
    let tempArr = [];
    for (const prop in tempObj) {
      if (prop.includes("roomie")){
        tempArr.push(tempObj[prop]);
        delete tempObj[prop];
      }
    }
    tempObj.roommates = tempArr;
    tempObj.gender = gender;
    tempObj.school = school;
    tempObj.numRoommates = numRoommates;
    tempObj.year = year;
    setSelections(tempObj);
    console.log(tempObj);
    //    Save selections to user profile
  };

  // INSERT student
  const insertToStudent = (obj) => {
    // console.log(obj);
    let tempArr = [];

    for (const prop in tempObj) {
      if (prop.includes("roomie")){
        tempArr.push(tempObj[prop]);
        delete tempObj[prop];
      }
    };

    tempObj.roommates = tempArr;
    tempObj.gender = gender;
    tempObj.school = school;
    tempObj.numRoommates = numRoommates;
    tempObj.year = year;
    tempObj.name = user.displayName.toLowerCase();

    if (year === "freshman") {
      tempObj.points = 1;
    } else if (year === "sophomore") {
      tempObj.points = 2;
    } else if (year === "junior") {
      tempObj.points = 3;
    } else if (year === "senior") {
      tempObj.points = 4;
    } else {
      console.log("not a valid year");
    }

    setSelections(tempObj);
    console.log(tempObj);

    Axios.post('http://localhost:3001/student/insert', tempObj)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="onboard">
      <h1 className="obTitle">
        welcome,{" "}
        <span className="special">{user.displayName.toLowerCase()}</span>
      </h1>
      <h2 className="obSub">
        before we get to the good stuff... let's get acquainted
      </h2>
      <p>what is your <span className="special">university</span>?</p>
      <input
        type="text"
        onChange={(e) => {
          setSchool(e.target.value);
        }}
      />
      {/* year */}
      <p>what is your <span className="special">year</span>?</p>
      <select
        onChange={(e) => {
          setYear(e.target.value);
        }}
      >
        <option>admin</option>
        <option>freshman</option>
        <option>sophomore</option>
        <option>junior</option>
        <option>senior</option>
      </select>
      {year === "admin" ? (
        <div className="linkContainer">
          <Link className="link" to="/admin" onClick={onSubmit}>
            submit
          </Link>
        </div>
      ) : (
        <div className="student">
          {/* gender */}
          <p>what is your <span className="special">gender</span>?</p>
          <select
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option>male</option>
            <option>female</option>
            <option>nonbinary</option>
            <option>other/prefer not to say</option>
          </select>
          {/* number of roomates */}
          <p>how many <span className="special">roommates</span> do you plan to have next year?</p>
          <select
            onChange={(e) => {
              setNum(parseInt(e.target.value, 10));
            }}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>not sure</option>
          </select>
          {numRoommates === 0 || numRoommates === "not sure" ? (
            <div className="linkContainer1">
              <Link className="link" to="/" onClick={insertToStudent}>
                submit
              </Link>
            </div>
          ) : (
            <div className="meerkat">
              <p>list the <span className="special">school email</span> of each of your intended roommates:</p>
              <p id="sub">
                if a roommate has not joined soba, they will be invited over
                email. <span className="special">this is optional</span>, but including roommates will help us
                compute your chances of getting your preferred room
              </p>
              {Array.from(Array(numRoommates), (e, i) => {
                return (
                  <input
                    type="text"
                    key={i}
                    onChange={(e) => {
                      tempObj[`roomie${i}`] = e.target.value;
                    }}
                  />
                );
              })}
              <div className="linkContainer2">
                <Link className="link" to="/" onClick={insertToStudent}>
                  submit
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Onboard;
