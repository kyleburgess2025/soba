import React, { useState } from "react";
import useCollapse from "react-collapsed";
import "../pages/admin.css";
function Collapsible({ onSubmit }) {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const [name, setName] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [img_url, setImgUrl] = useState("");
  const [room_plan, setRoomPlan] = useState("");
  const [numRoomTypes, setNumRoomTypes] = useState(0);

  let tempObj = {};

  function handleOnClick() {
    // Do more stuff with the click event!
    // Or, set isExpanded conditionally
    setExpanded(!isExpanded);
  }

  function submitButton() {
    const tempArr = [];
    for (const prop in tempObj) {
      if (prop.includes("room")) {
        console.log(tempObj[prop]);
        tempArr.push(tempObj[prop]);
        delete tempObj[prop];
      }
    }
    console.log(tempArr);
    handleOnClick();
    onSubmit(name, amenities, img_url, room_plan, tempArr);
  }

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps({ onClick: handleOnClick })}>
        {isExpanded ? "collapse" : "add new item"}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          <p>dorm name:</p>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <p>amenities (separate each amenity with a comma):</p>
          <input
            type="text"
            onChange={(e) =>
              setAmenities(e.target.value.split(",").map((e) => e.trim()))
            }
          />
          <p>url of image of dorm:</p>
          <input type="text" onChange={(e) => setImgUrl(e.target.value)} />
          <p>url of room plans:</p>
          <input type="text" onChange={(e) => setRoomPlan(e.target.value)} />
          <p>number of room types:</p>
          <input
            type="avail_beds"
            onChange={(e) => setNumRoomTypes(parseInt(e.target.value, 10))}
          />
          {numRoomTypes === 0 || !numRoomTypes ? (
            <div>
              <button onClick={submitButton}>submit</button>
            </div>
          ) : (
            <div>
              {Array.from(Array(numRoomTypes), (e, i) => {
                tempObj[`room${i}`] = {};
                return (
                  <div id="room">
                    <p>room type:</p>
                    <input
                      type="text"
                      key={`name${i}`}
                      onChange={(e) => {
                        tempObj[`room${i}`]["name"] = e.target.value;
                      }}
                    />
                    <p>available beds:</p>
                    <input
                      type="number"
                      key={`number${i}`}
                      onChange={(e) => {
                        tempObj[`room${i}`]["avail_beds"] = parseInt(
                          e.target.value,
                          10
                        );
                      }}
                    />
                  </div>
                );
              })}
              <button onClick={submitButton}>submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Collapsible;
