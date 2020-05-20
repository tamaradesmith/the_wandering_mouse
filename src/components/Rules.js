import React from 'react';

function Rules(props) {

  function handleClose(){
    props.closeRules();
  }
  return (
    <div id="rules" className="rules fadeout">
      <h2 className="rules-header"> Rules </h2>
      <h4>Goal:</h4>
      <p className="rules-p">
        To get the Wandering Mouse home to the mouse hole.
      </p>
      <h4>Movement</h4>
      <p className="rules-p"> Left Click, to turn on and off the wandering mouse movement.  Then the Wandering Mouse will follow your computer mouse.  If your computer mouse gets to far from the Wandering mouse, he will stopped following. If you leave the play area the Wandering Mouse will stop. </p>
      <h4>Hazards </h4>
      <p className="rules-p"> <strong> Rocks:  </strong> Hudson the Rock Kitten sometime hides in rock looking for mouse to come too close </p>
      <p className="rules-p"><strong> Grass:  </strong> Aurora like lay in the grass until she spots a mouse near by the grass, then she comes running for the mouse</p>
      <h4> Tools</h4>
      <p className="rules-p"> <strong> Paws:  </strong>check the paws for Mouse Bomb, each level has one.</p>
      <p className="rules-p"> <strong>Mouse Bomb: </strong>  Double click to use a mouse bomb, a group of shadow mice will be release to move randmonly around the board.  If Aurora runs into a  shadow mice, she will take it back into hiddening with her and leave the Wandering mouse alone.  If a shadow hit the edges of the board, it will fade away.</p>

      <button className="btn" onClick={handleClose}> close </button>
    </div>
  );
};

export default Rules;