import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Dorm from "../components/dorm";
import "./dashboard.css";
import Axios from "axios";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [numDorms, setNum] = useState(0);
  const savedDorms = [
    {
      name: "McGill",
      amenities: ["Laundry", "Good location", "Singles"],
      img_url:
        "https://cdn.vanderbilt.edu/vu-web/insidedores-wpcontent/20190418062955/IMG_20141009_172243_1-11.jpg",
      room_plans:
        "https://www.campus1mtl.ca/montreal-student-housing/floorplans",
      room_types: [
        {
          name: "double",
          reviews: [
            {
              user: "Kari",
              value: 4,
              message: "Great place!",
            },
            {
              user: "Kyle",
              value: 5,
              message: "Great place!",
            },
          ],
          avail_beds: 40,
        },
        {
          name: "single",
          reviews: [
            {
              user: "Kari",
              value: 4,
              message: "Great place!",
            },
            {
              user: "Kyle",
              value: 5,
              message: "Great place!",
            },
          ],
          avail_beds: 70,
        },
      ],
      reviews: [
        {
          user: "Kari",
          value: 4,
          message: "Great place!",
        },
        {
          user: "Kyle",
          value: 5,
          message: "Great place!",
        },
      ],
    },
    {
      name: "EBI",
      amenities: ["Laundry", "Attached food", "Nice suites"],
      img_url:
        "https://cdn.vanderbilt.edu/vu-web/insidedores-wpcontent/20190418062955/IMG_20141009_172243_1-11.jpg",
      room_plans:
        "https://www.campus1mtl.ca/montreal-student-housing/floorplans",
      room_types: [
        {
          name: "double",
          reviews: [
            {
              user: "Kari",
              value: 4,
              message: "Great place!",
            },
            {
              user: "Kyle",
              value: 5,
              message: "Great place!",
            },
          ],
          avail_beds: 40,
        },
        {
          name: "single",
          reviews: [
            {
              user: "Kari",
              value: 4,
              message: "Great place!",
            },
            {
              user: "Kyle",
              value: 5,
              message: "Great place!",
            },
          ],
          avail_beds: 70,
        },
      ],
      reviews: [
        {
          user: "Kari",
          value: 1,
          message: "Great place!",
        },
        {
          user: "Kyle",
          value: 2,
          message: "Great place!",
        },
      ],
    },
  ];

  useEffect(() => {
    Axios.get("http://localhost:3001/dorm/count")
      .then((res) => {
        console.log(res);
        setNum(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const [self, setSelf] = useState({
    name: user.displayName,
    year: "freshman",
    gender: "male",
    roommates: ["hello@gmail.com", "goodbye@gello.com"],
    num_roommates: 2,
    school: "vanderbilt",
    points: 3,
    savedDorms,
  });

  return (
    <div className="db">
      <h1 className="dbHello">hello, {user.displayName.toLowerCase()}</h1>
      {self.savedDorms.length === 0 ? (
        <h3>you have no saved dorms.</h3>
      ) : (
        <div>
          <h3>saved dorms:</h3>
          {self.savedDorms.map(function (obj, i) {
            return <Dorm info={obj}></Dorm>;
          })}
        </div>
      )}
      {self.num_roommates === 0 ? (
        <h3>you have no recorded roommates.</h3>
      ) : (
        <div>
          <h3>your roommates:</h3>
          {self.roommates.map(function (email, i) {
            return <p>{email}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
