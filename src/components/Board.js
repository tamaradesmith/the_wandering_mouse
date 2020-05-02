import React, { useState, useEffect } from 'react';

import { RocksQuery } from '../js/rocksQuery';
import { GrassQuery } from '../js/grassQuery';
import { CatQuery } from '../js/catQuery';
import { MouseQuery } from '../js/mouseQuery';
import { PawQuery } from '../js/pawQuery';

import Score from './Score';
import Mouse from './character/Mouse';
import Hole from './character/Hole';
import Rock from './character/Rock';
import Grass from './character/Grass';
import Aurora from './character/Aurora';
import Paws from './character/Paws';
import Mice from './character/Mice';

function Board(props) {

  const [score, setScore] = useState({ level: 1, grass: 0, rock: 0, home: 0, update: false });


  const [boardLeft, setBoardLeft] = useState(null);
  const [boardTop, setBoardTop] = useState(null);

  const [mouseFreeze, setMouseFreeze] = useState(false);
  const [mouse, setMouse] = useState({ left: 25, top: 25, bottom: 100, right: 100 })
  const [mouseMoving, setMouseMoving] = useState(0);

  const [cat, setCat] = useState({ left: 100, top: 100, bottom: 200, right: 250 });
  const [catFreeze, setCatFreeze] = useState(true);

  const [hole, setHole] = useState({ left: 1100, top: 700, bottom: 750, right: 1180 });
  const [rockLocations, setRocksLocations] = useState([]);
  const [grassLocations, setGrassLocations] = useState([]);
  const [pawLocations, setPawLocation] = useState([]);
  const [mouseBomb, setMouseBomb] = useState(1)
  const [miceLocatons, setMiceLocations] = useState([]);

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
      const newMouse = MouseQuery.overMouse(xpos, ypos, mouse);
      if (newMouse !== false) {
        setMouse(newMouse);
        const move = (mouseMoving === 1) ? 0 : 1;
        setMouseMoving(move);
      }
    }
  }

  function updateScore(type, levelUp) {
    const newScore = { ...score };
    if (levelUp === true) {
      newScore.level = score.level + 1;
      newScore[type] = score[type] + 1;
    } else {
      newScore[type] = score[type] + 1;
      newScore.level = 1;

    }
    setScore(newScore)
  }

  function mouseHole() {
    const result = MouseQuery.mouseHole(mouse, hole)
    if (result === true) {
      setMouseFreeze(true);
      mouseCaught("Wandering Mouse wandered home!!!");
      updateScore('home', true);
    }
  }

  function resetMouse() {
    setTimeout(() => {
      setMouse({ left: 25, right: 100, top: 25, bottom: 100 });
      setRocksLocations([]);
      setMouseFreeze(false);
      setCatFreeze(true)
      document.querySelector("#message").classList.toggle("show")
      document.querySelector("#mouse").classList.toggle("fadein");
      document.querySelector("#mouse").classList.toggle("fadeout");
      document.querySelector("#aurora").classList.add("fadeout");
    }, 3000);
  }

  function mouseCaught(message, type) {
    setMouseFreeze(true);
    document.querySelector("#mouse").classList.toggle("fadeout");
    document.querySelector("#mouse").classList.toggle("fadein");
    document.querySelector('#aurora').classList.add("hidden");
    document.querySelector('#aurora').classList.remove("show");

    document.querySelectorAll(".rock").forEach(rock => {
      rock.classList.add("fadeout");
    })
    document.querySelectorAll(".grass").forEach(blade => {
      blade.classList.add("fadeout");
    })

    updateScore(type, false);

    document.querySelector("#messageText").innerText = message;
    setTimeout(() => {
      document.querySelector("#message").classList.toggle("show");
      resetMouse();
    }, 1000);
  }

  //  // ROCKS 
  function setupRocks() {
    const result = RocksQuery.setup(rockLocations)
    setRocksLocations(result);
  };

  function mouseRock() {
    const result = RocksQuery.overRock(mouse, rockLocations);
    const cat = (result) ? RocksQuery.catInRock() : false;
    if (cat === true) {
      mouseCaught(`Mouse caught by Hudson the Rock Hidding Kitten`, "rock");
    }
  }

  // // GRASS

  function setupGrass() {
    const result = GrassQuery.setup();
    const grassLoc = GrassQuery.checkRocks(result, rockLocations);
    setGrassLocations(grassLoc);
    document.querySelectorAll(".grass").forEach(blade => {
      blade.classList.remove("fadeout");
    })
    setupCat();
  }

  function mouseGrass() {
    const result = GrassQuery.overGrass(mouse, grassLocations);
    const Newcat = (result) ? activeCat() : '';
  }

  // Cat Named Aurora
  function setupCat() {
    const location = CatQuery.location();
    setCat(location);
    setupPaws();
  }

  function activeCat() {
    document.querySelector('#aurora').classList.remove("hidden");
    document.querySelector('#aurora').classList.add("show");
    setCatFreeze(false);
  }

  function mouseCat() {
    const result = CatQuery.overCat(mouse, cat);
    const message = "Aurora leaps out from the grass tuff and caughts the Wandering Mouse "
    result ? mouseCaught(message, "grass") : CatQuery.move(mouse, cat)
  }

  //  PAW Function

  function setupPaws() {
    const paws = PawQuery.setup();
    setPawLocation(paws);
  };

  function mousePaw() {
    const paw = PawQuery.overPaw(mouse, pawLocations);
    const result = paw.bomb ? setMouseBomb(mouseBomb + 1) : "";
    if (paw.result) {
      document.querySelector(`#${paw.id}`).classList.add("fadeout");
      const newLocation = [...pawLocations];
      newLocation[paw.index].freeze = true;
      setPawLocation(newLocation);
    };
  };

  function handleMouseBomb() {
    if (mouseBomb > 0) {
      const bomb = PawQuery.setupMouseBomb(mouse);
      console.log("handleMouseBomb -> bomb", bomb);
      setMiceLocations(bomb);

    }
  }

  useEffect(() => {
    setBoardCoors();
  }, [boardLeft === null]);

  useEffect(() => {
    if (!mouseFreeze) {
      mouseHole();
      mouseRock();
      mouseGrass();
      mousePaw();
    }
    if (!catFreeze) {
      mouseCat();
    }
  }, [mouseMoving]);

  useEffect(() => {
    setupRocks();
  }, [rockLocations.length === 0]);


  useEffect(() => {
    if (rockLocations !== 0) {
      setupGrass();
    }
  }, [rockLocations]);



  return (
    <main  >
      <div id="board" className="board" onMouseMove={findCoords}>

        <div id="mouse" className="mouse fadein" style={{ left: mouse.left, top: mouse.top }}>
          <Mouse />
        </div>

        <div id="hole" className='mouse-hole' style={{ left: hole.left, top: hole.top }}>
          <Hole />
        </div>

        {rockLocations.map((rock, index) => (
          <Rock key={index} location={rock} />
        ))}


        {grassLocations.map((grass, index) => (
          <Grass key={index} location={grass} />
        ))}

        <div id="aurora" className="cat hidden" style={{ left: cat.left, top: cat.top }} >
          <Aurora />
        </div>

        {pawLocations.map((paw, index) => (
          <Paws key={index} location={paw} />
        ))}

          {miceLocatons.map((mice, index) => (
              <Mice key={index} location={mice} />
            ))}


        <div id="message" className="message-div hidden">
          <p id="messageText"> </p>
        </div>
      </div>

      <Score score={score} mouseBombCount={mouseBomb} mouseBomb={handleMouseBomb} />
    </main>
  )
}

export default Board