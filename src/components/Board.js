import React, { useState, useEffect } from 'react';

import { RocksQuery } from '../js/rocksQuery';
import { GrassQuery } from '../js/grassQuery';
import { CatQuery } from '../js/catQuery';

import Mouse from './character/Mouse';
import Hole from './character/Hole';
import Rock from './character/Rock';
import Grass from './character/Grass';
import Aurora from './character/Aurora';

function Board(props) {

  const [boardLeft, setBoardLeft] = useState(null);
  const [boardTop, setBoardTop] = useState(null);

  const [mouseFreeze, setMouseFreeze] = useState(false);
  const [mouseTop, setMouseTop] = useState(25);
  const [mouseLeft, setMouseLeft] = useState(25);

  const [cat, setCat] = useState({ left: 100, top: 100, bottom: 200, right: 250 });
  const [catFreeze, setCatFreeze] = useState(true);

  const [hole, setHole] = useState({ left: 1100, top: 700, bottom: 750, right: 1180 });
  const [rockLocations, setRocksLocations] = useState([]);
  const [grassLocations, setGrassLocations] = useState([]);

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
          setMouseLeft(mouseLeft + Math.ceil(Math.random() * 10));
        } else if (left > 55) {
          setMouseLeft(mouseLeft - Math.ceil(Math.random() * 10));
        }
        if (top < 25) {
          setMouseTop(mouseTop + Math.ceil(Math.random() * 10));
        } else if (top > 55) {
          setMouseTop(mouseTop - Math.ceil(Math.random() * 10));
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
        document.querySelector("#messageText").innerText = "Wandering Mouse wandered home!!!";
        setMouseLeft(hole.left);
        setMouseTop(hole.top);
        setTimeout(() => {
          document.querySelector("#message").classList.toggle("show")
          resetMouse();
        }, 1000);
      }
    }
  }

  function resetMouse() {
    setTimeout(() => {
      setMouseLeft(25);
      setMouseTop(25);
      setRocksLocations([]);
      setMouseFreeze(false);
      document.querySelector("#message").classList.toggle("show")
      document.querySelector("#mouse").classList.toggle("fadein");
      document.querySelector("#mouse").classList.toggle("fadeout");
    }, 3000);
  }

  function mouseCaught() {
    setMouseFreeze(true);
    document.querySelector("#mouse").classList.toggle("fadeout");
    document.querySelector("#mouse").classList.toggle("fadein");
    document.querySelector('#cat').classList.add("hidden");
    document.querySelector('#cat').classList.remove("show");

    document.querySelectorAll(".rock").forEach(rock => {
      rock.classList.add("fadeout");
    })
    document.querySelector("#messageText").innerText = `Mouse caught by Hudson the Rock Hidding Kitten`;
    setTimeout(() => {
      document.querySelector("#message").classList.toggle("show");
      resetMouse();
    }, 1000);
  }

  //  // ROCKS 
  function setupRocks() {
    const result = RocksQuery.setup(rockLocations)
    setRocksLocations(result);
    setupGrass();
  };


  function mouseRock() {
    const result = RocksQuery.overRock(mouseLeft, mouseTop, rockLocations);
    const cat = (result) ? RocksQuery.catInRock() : false;
    if (cat === true) {
      mouseCaught();
    }
  }

  // // GRASS

  function setupGrass() {
    const result = GrassQuery.setup(grassLocations);
    const grassLoc = GrassQuery.checkRocks(result, rockLocations);
    setGrassLocations(grassLoc);
    setupCat();
  }

  function mouseGrass() {
    const result = GrassQuery.overGrass(mouseLeft, mouseTop, grassLocations);
    const cat = (result) ? activeCat() : '';
  }

  // Cat Named Aurora
  function setupCat() {
    const location = CatQuery.location();
    setCat(location);
  }

  function activeCat() {
    document.querySelector('#aurora').classList.remove("hidden");
    document.querySelector('#aurora').classList.add("show");
    setCatFreeze(false);
  }

  function mouseCat(){
    const result = CatQuery.overCat(mouseLeft, mouseTop, cat)
    const move = result ? mouseCaught() : CatQuery.move(mouseLeft, mouseTop, cat)
  }

  useEffect(() => {
    setBoardCoors();
  }, [boardLeft === null]);

  useEffect(() => {
    if (!mouseFreeze) {
      mouseHole();
      mouseRock();
      mouseGrass();
    }
    if (!catFreeze) {
      mouseCat();
    }
  }, [mouseLeft]);

  useEffect(() => {
    setupRocks();
  }, [rockLocations.length === 0]);


  return (
    <main id="board" className="board" onMouseMove={findCoords} >
      <div id="mouse" className="mouse fadein" style={{ left: mouseLeft, top: mouseTop }}>
        <Mouse />
      </div>

      <div id="hole" className='mouse-hole' style={{ left: hole.left, top: hole.top }}>
        <Hole />
      </div>

      {rockLocations !== null ? (
        <>
          {rockLocations.map((rock, index) => (
            <Rock key={index} location={rock} />
          ))}
        </>
      ) : (null)}

      {grassLocations.map((grass, index) => (
        <Grass key={index} location={grass} />
      ))}

      <div id="aurora" className="cat hidden" style={{ left: cat.left, top: cat.top }} >
        <Aurora />
      </div>

      <div id="message" className="message-div hidden">
        <p id="messageText"> </p>
      </div>
    </main>
  )
}

export default Board