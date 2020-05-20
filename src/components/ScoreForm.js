import React from "react";

function ScoreForm(props){

function handleName(){
  let name = document.querySelector('#name').value;
  name = (!name) ? "aurora" : name
  props.newHighScore(name);
  document.querySelector('#newHightScore').classList.add('fadeout')
}

return (
  <div id="newHightScore" className="ScoreForm new-score-div fadeout">
  <h3 className="score-title"> New High Score!!!</h3>
  <label htmlFor="name" className="label">Your Name:</label>
    <input type="text" id="name" placeholder="Please Enter your name" className='form' />
    <button onClick={handleName} className="btn"> Enter </button>
  </div>
);
};

export default ScoreForm;