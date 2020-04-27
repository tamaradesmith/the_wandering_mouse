import React from 'react';

import mouse from '../../images/mouse.png';
function Mouse(props) {
function handleMove(event){
  const target = event.target;
 
}

  return (

    <div className="mouse" id="mouse" onMouseEnter={handleMove}>
      <img src={mouse} alt={"Mouse Character"} />
    </div>

  );
};
export default Mouse;