import React, { useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./admin.css";
import Collapsible from "../components/collapsible";

function Admin() {
  const [user, loading, error] = useAuthState(auth);

  const [school, setSchool] = useState("Vanderbilt");
  const [dormArr, setDorms] = useState([
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

  function onSubmit(name, amenities, img_url, room_plan, room_types){
      const finalObj = {
          name,
          amenities,
          img_url,
          room_plan,
          room_types
      }
      console.log(finalObj);
  }

  return (
    <div>
      <h1>hello, {user.displayName.toLowerCase()}...</h1>
      <h2>let's get to work</h2>
      <div className="schools">
        <h3>{school.toLowerCase()}'s dorms</h3>
        <Collapsible
          onSubmit={onSubmit}
        />
        {dormArr.map(function (obj, index) {
          return (
            <div className="dormObj">
              <div>
                <img src={obj.img_url} alt="" className="smallImg" />
              </div>
              <div className="info">
                <p>{obj.name.toLowerCase()}</p>
                <ul>
                  {obj.amenities.map(function (amen, index) {
                    return <li>{amen.toLowerCase()}</li>;
                  })}
                </ul>
                <p>room types</p>
                <ul>
                  {obj.room_types.map(function (type, index) {
                    return (
                      <li>
                        {type.name.toLowerCase()}: {type.avail_beds} beds
                        available
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;
