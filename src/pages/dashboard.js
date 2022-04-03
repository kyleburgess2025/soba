import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Dorm from "../components/dorm";
import "./dashboard.css";


const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [savedDorms, setDorms] = useState([
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
    },
  ]);

  return (
    <div className="db">
      <h1 className="dbHello">hello, {user.displayName}</h1>
      {savedDorms.length === 0 ? <h3>you have no saved dorms.</h3> : <div>
        <h3>saved dorms:</h3>
        {savedDorms.map(function(obj, i){
          return <Dorm info={obj}></Dorm>
        })}
        </div>}
    </div>
  );
}

export default Dashboard;