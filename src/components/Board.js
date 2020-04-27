import React, {useState} from 'react';

import Mouse from './character/Mouse'

function Board(props) {

  // const {boardLeft, setBoardLeft} = useState(0);


  function findCoords(mouseEvent) {
    let board = document.querySelector("#board");
    let boardLeft = 0;
    let boardTop = 0;
    let xpos, ypos;
    while (board.offsetParent) {
      boardLeft += board.offsetLeft;
      boardTop += board.offsetTop;
      board = board.offsetParent;
    }
    if (mouseEvent){
      xpos = mouseEvent.pageX;
      ypos = mouseEvent.pageY;
    } else {
      xpos = window.event.x + document.body.scrollLeft - 2;
      ypos = window.event.y  + document.body.scrollTop - 2;
      console.log("findCoords Else -> ypos", ypos);

    }
    xpos -= boardLeft;
    ypos -= boardTop;
    document.getElementById("objectCoords").innerHTML = xpos + ", " + ypos;
  }


  return (
    <main id="board" className="board" onMouseMove={findCoords} >
      <Mouse />
      <p id="objectCoords"> </p>
    </main>
  )
}

export default Board