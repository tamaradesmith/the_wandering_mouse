import React from 'react';

function Rules(props) {

  function handleClose() {
    props.closeRules();
  }
  return (
    <div id="rules" className="Rules rules fadeout">
      <h2 className="rules-header"> Rules </h2>
      <div className="rules-div">

        <h4>Goal:</h4>
        <p className="rules-p">
          To get the Wandering Mouse home to the mouse hole.
        </p>
        <h4>Movement:</h4>
        <ul className="rules-list" >
          <li>
            Left Click, to turn on and off the wandering mouse movement.
          </li>
          <li>
            Then the Wandering Mouse will follow your computer mouse.
          </li>
          <li>
            If your computer mouse gets to far from the Wandering mouse, he will stopped following.
          </li>
          <li>
            If you leave the play area the Wandering Mouse will stop.
          </li>
        </ul>

        <h4>Hazards:</h4>
        <p className="rules-p"> <strong> Rocks:  </strong></p>

        <ul className="rules-list">
          <li>
            Hudson the Rock Kitten sometime hides in rock looking for mouse to come too close.
          </li>
        </ul>

        <p className="rules-p"><strong> Grass: </strong></p>
        <ul className="rules-list">
          <li>
            Aurora likes to lay in the grass until she spots a mouse  by the grass, then she comes running.
          </li>
          <li>
            Then it is a race to get to the mouse hole before Aurora reaches the Wandering Mouse.
          </li>
        </ul>

        <h4>Tools:</h4>
        <p className="rules-p"> <strong> Paws:</strong></p>
        <ul className="rules-list">
          <li>
            Check the paws for Mouse Bomb, each level has one mouse bomb.
          </li>
        </ul>

        <p className="rules-p"> <strong>Mouse Bomb: </strong> </p>

        <ul className="rules-list">
          <li>
            Double click to use a mouse bomb, a group of shadow mice will be release to move randmonly around the board.
          </li>
          <li>
            If Aurora runs into a  shadow mice, she will take it back into hidding with her and leave the Wandering mouse alone.
          </li>
          <li>
            If a shadow hit the edges of the board, it will fade away.
          </li>
        </ul>
      </div>


      <button className="btn" onClick={handleClose}> close </button>
    </div>
  );
};

export default Rules;