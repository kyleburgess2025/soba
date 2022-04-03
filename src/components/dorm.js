import React, { useState, useEffect } from "react";
import calculateAverage from "../pages/helper_functions/reviews_to_value";
import ReactStars from "react-stars";
import { probability } from "../pages/helper_functions/probability";
import Axios from 'axios';

const Dorm = ({ info }) => {
  console.log(probability(info));
  const [prob, setProb] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/count")
      .then((res) => {
        setProb(probability(info,res.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <div
        className="dormObj"
        style={{ backgroundImage: `url(${info.img_url})` }}
      >
        <div className="info">
          <p>{info.name.toLowerCase()}</p>
          <ReactStars
            count={5}
            size={24}
            color2={"#ecffb0"}
            edit={false}
            value={calculateAverage(info.reviews)}
            half={true}
          />
          <p>probability: {prob}/100</p>
          <ul>
            {info.amenities.map(function (amen, index) {
              return <li>{amen.toLowerCase()}</li>;
            })}
          </ul>
          <p>room types</p>
          <ul>
            {info.room_types.map(function (type, index) {
              return (
                <li>
                  {type.name.toLowerCase()}: {type.avail_beds} beds available
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dorm;
