import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./admin.css";
import Collapsible from "../components/collapsible";

import Axios from 'axios';

function Admin() {
  // new changes
  const [dormList, setDormList] = useState([]);

  const [user, loading, error] = useAuthState(auth);

  const [school, setSchool] = useState("Vanderbilt");
  // const [dormArr, setDorms] = useState([
  //   {
  //     name: "McGill",
  //     amenities: ["Laundry", "Good location", "Singles"],
  //     img_url:
  //       "https://cdn.vanderbilt.edu/vu-web/insidedores-wpcontent/20190418062955/IMG_20141009_172243_1-11.jpg",
  //     room_plans:
  //       "https://www.campus1mtl.ca/montreal-student-housing/floorplans",
  //     room_types: [
  //       {
  //         name: "double",
  //         reviews: [
  //           {
  //             user: "Kari",
  //             value: 4,
  //             message: "Great place!",
  //           },
  //           {
  //             user: "Kyle",
  //             value: 5,
  //             message: "Great place!",
  //           },
  //         ],
  //         avail_beds: 40,
  //       },
  //       {
  //         name: "single",
  //         reviews: [
  //           {
  //             user: "Kari",
  //             value: 4,
  //             message: "Great place!",
  //           },
  //           {
  //             user: "Kyle",
  //             value: 5,
  //             message: "Great place!",
  //           },
  //         ],
  //         avail_beds: 70,
  //       },
  //     ],
  //   },
  //   {
  //     name: "EBI",
  //     amenities: ["Laundry", "Attached food", "Nice suites"],
  //     img_url:
  //       "https://cdn.vanderbilt.edu/vu-web/insidedores-wpcontent/20190418062955/IMG_20141009_172243_1-11.jpg",
  //     room_plans:
  //       "https://www.campus1mtl.ca/montreal-student-housing/floorplans",
  //     room_types: [
  //       {
  //         name: "double",
  //         reviews: [
  //           {
  //             user: "Kari",
  //             value: 4,
  //             message: "Great place!",
  //           },
  //           {
  //             user: "Kyle",
  //             value: 5,
  //             message: "Great place!",
  //           },
  //         ],
  //         avail_beds: 40,
  //       },
  //       {
  //         name: "single",
  //         reviews: [
  //           {
  //             user: "Kari",
  //             value: 4,
  //             message: "Great place!",
  //           },
  //           {
  //             user: "Kyle",
  //             value: 5,
  //             message: "Great place!",
  //           },
  //         ],
  //         avail_beds: 70,
  //       },
  //     ],
  //   },
  // ]);

  const insertToDorm = (obj) => {
    console.log(obj);
    Axios.post('http://localhost:3001/dorm/insert', obj)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function onSubmit(name, amenities, img_url, room_plan, room_types) {
    const finalObj = {
      name,
      amenities,
      img_url,
      room_plan,
      room_types,
    };
    setDormList([...dormList, finalObj]);
    insertToDorm(finalObj);
    console.log(finalObj);
  }

  // useEffect /read
  useEffect(() => {
    Axios.get('http://localhost:3001/read').then(res => {
      console.log(res.data);
      setDormList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className="admin">
      <h1>hello, {user.displayName.toLowerCase()}...</h1>
      <h2>let's get to work</h2>

      <br></br>
      <div className="schools">
        <div className="admin-title">
          <h3>{school.toLowerCase()}'s dorms</h3>
          <Collapsible className="collapse" onSubmit={onSubmit} />
        </div>
        {dormList.map(function (obj, index) {
          return (
            <div className="dormObj" style={{backgroundImage: `url(${obj.dorm_img_url})`}}>
              <div className="info">
                <h1>{user.displayName.toLowerCase()}</h1>
                <ul>
                  {obj.dorm_amenities.map(function (amen, index) {
                    return <li>{amen.toLowerCase()}</li>;
                  })}
                </ul>
                <h3>room types</h3>
                <ul>
                  {obj.dorm_room_types.map(function (type, index) {
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
      <h1>HI</h1>

      {dormList.map((val, key) => {
        return (
          <div key={key}>
            <h3>{val.dorm_name}</h3>
            <p>{val.dorm_amenities}</p>
            <p>{val.dorm_img_url}</p>
            <p>{val.dorm_room_plan}</p>
            <p>
              {val.dorm_room_types.map((val, key) => {
                return (
                  <div key={key}>
                    <p>{val.name}</p>
                    <p>{val.avail_beds}</p>
                  </div>
                );
              })}
            </p>


            {/* <button onClick={() => updateSchoolName(val._id)}>Update</button> */}
            {/* <button onClick={() => deleteSchool(val._id)}>Delete</button> */}
          </div>
        )
      })}

    </div>
    
    
  );
}

export default Admin;
