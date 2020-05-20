import React from "react";

function HighScores(props) {
  const { scores } = props;

  function handleClose() {
    props.closeScores();
  }


  return (
    <div id='highScores' className="HighScores high-score-div fadeout">
      <h4 className='high-score-header'> High Scores</h4>
      <div className='chart'>
        <h4 >Rank</h4>
        <h4 className='high-score-number' >Name</h4>
        <h4>Level</h4>
      </div>
      {scores.map((score, index) => (
        <div key={index} className="chart">
          <p className="high-score-number">{index + 1}</p>
          <p className="name"> {score.name} </p>
          <p className='high-score-number'> {score.level}</p>
        </div>
      ))}
      <button className="btn" onClick={handleClose}> Close </button>
    </div>
  );
};

export default HighScores;