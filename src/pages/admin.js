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
      // ** UNCOMMENT to log all dorms in DB
      // console.log(res.data);
      console.log("admin.js started");
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
              {/* this deletes the dorm */}
              <button onClick={() => deleteDorm(obj._id)}>DELETE</button>
            </div>
          );
        })}
      </div>
      
      {/* UNCOMMENT below to see all data in Dorms */}
      {/* <h1>Output</h1>
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
          </div>
        )
      })} */}

    </div>
    
    
  );
}

export default Admin;
