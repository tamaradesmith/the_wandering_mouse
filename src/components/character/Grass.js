import React from 'react';

import grass from '../../images/grass.png';

function Grass(props) {

  const { location } = props;

  return (
      <img src={grass} alt={"grass"} className="grass" style={{ left: location.left, top: location.top }} />
  );
};

export default Grass;