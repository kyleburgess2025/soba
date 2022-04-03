import React, { useState } from "react";
import calculateAverage from "../pages/helper_functions/reviews_to_value";
import ReactStars from "react-stars";

const Dorm = ({ info }) => {
    console.log(calculateAverage(info.room_types));
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
