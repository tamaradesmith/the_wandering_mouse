import React from 'react';

function Score(props) {

  const { score, mouseBombCount } = props;

  function handleClick(event){
    props.mouseBomb();
  }


  return (
    <main className="score">
      <p> Level: {score.level} </p>
      <p> Aurora: {score.grass}</p>
      <p> Husdon: {score.rock} </p>
      <p> Home: {score.home} </p>
      <p> Mouse Bomb: <button className="btn" onClick={handleClick}>{mouseBombCount}  </button></p>

    </main>
  )
}

export default Score;