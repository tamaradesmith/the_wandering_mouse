import React, { useState, useEffect } from "react";

import rock0 from "../../images/rock.png"
import rock1 from "../../images/rock1.png"
import rock2 from "../../images/rock2.png"


function Rock(props) {

  const { location } = props;
  const rocks = [rock0, rock1, rock2];
  const [number, setNumber] = useState(null)

  useEffect(() => {
    const number = Math.floor(Math.random() * 3);
    setNumber(number);
  }, [number === null])

  return (
      <img src={rocks[number]} alt={"rock"} className="rock" style={{ left: location.left, top: location.top }} />
  );
};

export default Rock