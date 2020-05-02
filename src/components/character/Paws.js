import React from 'react';

import pawIcon from '../../images/paw.png';

function Paws(props){

  const {location } = props;
  return (
    <img  id={location.paw} src={pawIcon} alt={"paws"} className="paws" style={{left: location.left, top: location.top}} />
  );
};

export default Paws;