import React from 'react';

function Score(props) {

  const { score, mouseBombCount } = props;

  function handleClick(event) {
    props.mouseBomb();
  }


  return (
    <main >
    <div className="score">
    <h3> Session Score:</h3>
      <p> Level: {score.level} </p>
      <p> Aurora: {score.grass}</p>
      <p> Husdon: {score.rock} </p>
      <p> Home: {score.home} </p>
      <div>
        <p> Tools</p>
        <p>
          Mouse Bomb: {mouseBombCount} 
        </p>
      </div>

    </div>
    </main>
  )
}

export default Score;