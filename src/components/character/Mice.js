import React from 'react';

import mice from '../../images/mice.png'
function Mice(props) {

  const { location } = props;

  return (
    <img id={location.id} src={mice} alt={"mice"} className="mice" style={{left: location.left, top: location.top}} />

  )
}

export default Mice