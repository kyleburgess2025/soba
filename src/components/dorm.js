import React, { useState } from "react";

const Dorm = ({info}) => {
    return (
      <div>
        <div
          className="dormObj"
          style={{ backgroundImage: `url(${info.img_url})` }}
        >
          <div className="info">
            <p>{info.name.toLowerCase()}</p>
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
}

export default Dorm;