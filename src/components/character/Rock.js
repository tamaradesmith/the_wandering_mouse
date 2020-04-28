import React, { useState, useEffect } from "react";

import rock0 from "../../images/rock.png"
import rock1 from "../../images/rock1.png"
import rock2 from "../../images/rock2.png"


function Rock(props) {

  const [rockNumber, setRockNumber] = useState(null)
  const [rock, setRock] = useState({ left: 0, right: 0, top: 0, bottom: 0 })

  const rocks = [rock0, rock1, rock2]
  function location() {
    const xPos = Math.ceil(Math.random() * 1100);
    const yPos =Math.ceil(Math.random() * 750);
    const location = {rockid: props.id.rock, left: xPos, right: xPos + 100, top: yPos, bottom: yPos + 75 };
    setRock(location);
    props.rockLocation(location)
  }

  useEffect(() => {
    const number = Math.floor(Math.random() * 3) 
    setRockNumber(number);
    location();
  }, [rockNumber === null])
  

  return (
    <div >
      <img src={rocks[rockNumber]} alt={"rock"} className="rock" style={{ left: rock.left, top: rock.top }} />
    </div>
  );
};

export default Rock