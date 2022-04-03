import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./admin.css";
import Collapsible from "../components/collapsible";

import Axios from 'axios';

function Admin() {
  // new changes
  const [dormList, setDormList] = useState([]); // dormList
  const [user, loading, error] = useAuthState(auth);
  const [school, setSchool] = useState("Vanderbilt");

  // INSERT dorm
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

  // DELETE dorm
  const deleteDorm = (input_id) => {
    Axios.delete('http://localhost:3001/dorm/delete/' + input_id)
  }

  function onSubmit(name, amenities, img_url, room_plan, room_types) {
    const finalObj = {
      dorm_name: name,
      dorm_amenities: amenities,
      dorm_img_url: img_url,
      dorm_room_plan: room_plan,
      dorm_room_types: room_types,
    };
    setDormList([...dormList, finalObj]);
    insertToDorm(finalObj);
    console.log(finalObj);
  }

  // useEffect /read
  useEffect(() => {
    Axios.get('http://localhost:3001/read').then(res => {
      console.log(res.data);
      setDormList(res.data); // setting list of dorms
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
            <div
              className="dormObj"
              style={{ backgroundImage: `url(${obj.dorm_img_url})` }}
            >
              <div className="info">
                <h1>{user.displayName.toLowerCase()}</h1>
                <button className="delete" onClick={() => deleteDorm(obj._id)}>
                  delete
                </button>
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
              {/* this deletes the dorm */}
            </div>
          );
        })}
      </div>  
      </div>
  );
}

export default Admin;
