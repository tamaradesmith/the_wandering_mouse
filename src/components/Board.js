import React, { useState, useEffect } from 'react';

import Mouse from './character/Mouse';
import Hole from './character/Hole';

function Board(props) {
  const [mouseFreeze, setMouseFreeze] = useState(false);
  const [mouseTop, setMouseTop] = useState(25);
  const [mouseLeft, setMouseLeft] = useState(25);
  const [boardLeft, setBoardLeft] = useState(null);
  const [boardTop, setBoardTop] = useState(null);
  const [hole, setHole] = useState({ left: 1100, top: 700, bottom: 750, right: 1180 });
  function setBoardCoors() {
    let board = document.querySelector("#board");
    let left = 0;
    let top = 0;
    while (board.offsetParent) {
      left += board.offsetLeft;
      top += board.offsetTop;
      board = board.offsetParent;
    }
    setBoardLeft(left);
    setBoardTop(top);
  }

  function findCoords(mouseEvent) {
    if (!mouseFreeze) {
      let xpos, ypos;
      if (mouseEvent) {
        xpos = mouseEvent.pageX;
        ypos = mouseEvent.pageY;
      } else {
        xpos = window.event.x + document.body.scrollLeft - 2;
        ypos = window.event.y + document.body.scrollTop - 2;
      }
      xpos -= boardLeft;
      ypos -= boardTop;
      overMouse(xpos, ypos);
    }
  }

  function overMouse(xpos, ypos) {
    if (xpos > mouseLeft && xpos < mouseLeft + 75) {
      if (ypos > mouseTop && ypos < mouseTop + 75) {
        const left = (xpos - mouseLeft);
        const top = ypos - mouseTop;
        if (left < 25) {
          setMouseLeft(mouseLeft + 5);
        } else if (left > 55) {
          setMouseLeft(mouseLeft - 5);
        }
        if (top < 25) {
          setMouseTop(mouseTop + 5);
        } else if (top > 55) {
          setMouseTop(mouseTop - 5);
        }
      }
    }
    if (mouseLeft < 0) {
      setMouseLeft(0 + 5);
    }
    if (mouseLeft + 75 > 1200) {
      setMouseLeft(1200 - 80)
    }
    if (mouseTop < 0) {
      setMouseTop(0 + 5);
    }
    if (mouseTop + 75 > 800) {
      setMouseTop(800 - 80)
    }
  }

  function mouseHole() {
    if (mouseLeft + 75 > hole.left && mouseLeft < hole.right) {
      if (mouseTop < hole.bottom && mouseTop + 75 > hole.top) {
        setMouseFreeze(true);
        document.querySelector("#mouse").classList.toggle("fadeout");
        document.querySelector("#mouse").classList.toggle("fadein");

        setMouseLeft(hole.left);
        setMouseTop(hole.top);
        setTimeout(() => {
          document.querySelector("#message").classList.toggle("show")
          resetMouse();
        }, 1000);
      }
    }
  }

  function resetMouse(){
    setTimeout(() => {
      setMouseLeft(25);
      setMouseTop(25);
      setMouseFreeze(false);
      document.querySelector("#message").classList.toggle("show")
      document.querySelector("#mouse").classList.toggle( "fadein");
      document.querySelector("#mouse").classList.toggle("fadeout");
    }, 3000);
  }

  useEffect(() => {
    setBoardCoors();
  }, [boardLeft === null]);

  useEffect(() => {
    if (!mouseFreeze) {
      mouseHole()
    }
  }, [mouseLeft]);

  return (
    <main id="board" className="board" onMouseMove={findCoords} >
      <div className="mouse fadein" id="mouse" style={{ left: mouseLeft, top: mouseTop }}>
        <Mouse boardLeft={boardLeft} boardTop={boardTop} />
      </div>
      <div id="hole" className='mouse-hole' style={{ left: hole.left, top: hole.top }}>
        <Hole />
      </div>
      <div id="message" className="message-div hidden">
        <p  >Wandering Mouse wandered home!!! </p>
      </div>
    </main>
  )
}

export default Board