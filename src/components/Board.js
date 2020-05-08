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

  const [mouseFollow, setMouseFollow] = useState(false);
  const [mouseFreeze, setMouseFreeze] = useState(false);
  const [mouse, setMouse] = useState({ left: 25, top: 25, bottom: 100, right: 100 })
  const [mouseMoving, setMouseMoving] = useState(0);

  const [cat, setCat] = useState({ left: 100, top: 100, bottom: 200, right: 250 });
  const [catFreeze, setCatFreeze] = useState(true);

  const [hole] = useState({ left: 1100, top: 700, bottom: 750, right: 1180 });
  const [rockLocations, setRocksLocations] = useState([]);
  const [grassLocations, setGrassLocations] = useState([]);
  const [pawLocations, setPawLocation] = useState([]);

  const [miceFreeze, setMiceFreeze] = useState(true);
  const [mouseBomb, setMouseBomb] = useState(1);
  const [found, setFound] = useState(false); // mouse bomb found
  const [miceLocations, setMiceLocations] = useState([]);

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
      if (mouseFollow === true) {
        const newMouse = MouseQuery.overMouse(xpos, ypos, mouse);
        if (newMouse !== false) {
          setMouse(newMouse);
          const move = (mouseMoving === 1) ? 0 : 1;
          setMouseMoving(move);
        };
      };
    };
  };

  function handleMouseClick() {
    setMouseFollow(mouseFollow === true ? false : true);
  }

  function updateScore(type) {
    const newScore = { ...score };
    if (type === "home") {
      newScore.level = score.level + 1;
      newScore[type] = score[type] + 1;
    } else {
      newScore[type] = score[type] + 1;
      newScore.level = 1;
    }
    setScore(newScore);
  }

  function mouseHole() {
    const result = MouseQuery.mouseHole(mouse, hole);
    if (result === true) {
      mouseCaught("Wandering Mouse wandered home!!!", "home");
    }
  }

  function resetMouse(type) {
    setMouseFollow(false);
    setTimeout(() => {
      if (document.querySelector("#message") === null) {
        console.log('problem with reset');
      } else {
        updateScore(type);
        setMouse({ left: 25, right: 100, top: 25, bottom: 100 });
        setMouseFreeze(false);
        setFound(false);
        document.querySelector("#message").classList.remove("show")
        document.querySelector("#mouse").classList.add("fadein");
        document.querySelector("#mouse").classList.remove("fadeout");
        document.querySelector("#aurora").classList.add("fadeout");
        // setupRocks()
        setMiceLocations([]);
        setMiceFreeze(true);
      }
    }, 3000);
  }

  function mouseCaught(message, type) {
    setMouseFreeze(true);

    document.querySelector("#mouse").classList.add("fadeout");
    document.querySelector("#mouse").classList.remove("fadein");
    document.querySelector('#aurora').classList.add("hidden");
    document.querySelector('#aurora').classList.remove("show");

    document.querySelector("#messageText").innerText = message;
    document.querySelector("#message").classList.toggle("show");

    document.querySelectorAll(".rock").forEach(rock => {
      rock.classList.add("fadeout");
    })
    document.querySelectorAll(".grass").forEach(blade => {
      blade.classList.add("fadeout");
    });

    if (type !== 'home') {
      setMouseBomb(1);
    };
    resetMouse(type);
  }

  //  // ROCKS 
  function setupRocks() {
    const result = RocksQuery.setup(score.level);
    setRocksLocations(result);
    document.querySelectorAll(".rock").forEach(blade => {
      blade.classList.remove("fadeout");
    })
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
    const result = GrassQuery.setup(score.level);
    const grassLoc = GrassQuery.checkRocks(result, rockLocations);
    setGrassLocations(grassLoc);
    document.querySelectorAll(".grass").forEach(blade => {
      blade.classList.remove("fadeout");
    })
    setupCat();
    setupPaws();
  }


  function mouseGrass() {
    const result = GrassQuery.overGrass(mouse, grassLocations);
    if (result) { activeCat() };
  }

  // Cat Named Aurora
  function setupCat() {
    const location = CatQuery.location();
    setCat(location);
    setCatFreeze(true);

  }

  function activeCat() {
    document.querySelector('#aurora').classList.remove("hidden");
    document.querySelector('#aurora').classList.add("show");
    setCatFreeze(false);
  }

  function mouseCat() {
    const result = CatQuery.overCat(mouse, cat);
    const message = "Aurora leaps out from the grass tuff and caughts the Wandering Mouse ";
    result ? mouseCaught(message, "grass") : CatQuery.move(mouse, cat);
  };

  //  PAW Function

  function setupPaws() {
    const paws = PawQuery.setup();
    setPawLocation(paws);
    document.querySelectorAll(".paws").forEach(paw => {
      paw.classList.remove("fadeout");
    })
  };

  function mousePaw() {
    const paw = PawQuery.overPaw(mouse, pawLocations, found);
    if (paw.bomb) {
      const number = mouseBomb + 1
      setMouseBomb(number);
      setFound(true);
      document.querySelector(`#${paw.id}found`).classList.toggle("fadeout");
      document.querySelector(`#${paw.id}found`).classList.toggle("fadein");
      setTimeout(() => {
        document.querySelector(`#${paw.id}found`).classList.toggle("fadeout");
        document.querySelector(`#${paw.id}found`).classList.toggle("fadein");
      }, 3000);
    }
    if (paw.result) {
      document.querySelector(`#${paw.id}`).classList.add("fadeout");
      const newLocation = [...pawLocations];
      newLocation[paw.index].freeze = true;
      setPawLocation(newLocation);
    };
  };


  function auroraMice() {
    const result = CatQuery.overMice(cat, miceLocations, catFreeze);
    miceLocations.forEach(mice => {
      const miceId = document.querySelector(`#${mice.id}`);
      if (miceId && mice.freeze) {
        miceId.classList.add("fadeout");
      };
    });


    if (result.status) {
      setCatFreeze(true);
      document.querySelector('#aurora').classList.add("hidden");
      document.querySelector('#aurora').classList.remove("show");
      setTimeout(() => {
        setupCat();
      }, 2000);
    }
  }

  function handleMouseBomb() {
    if (mouseBomb > 0) {
      setMiceLocations([]);
      const bomb = PawQuery.setupMouseBomb(mouse);
      setMiceLocations(bomb);
      setMouseBomb(mouseBomb - 1);
      setMiceFreeze(false);
    }
  }

  useEffect(() => {
    setBoardCoors();
  }, [boardLeft]);

  useEffect(() => {
    if (!mouseFreeze) {
      mouseHole();
      mouseRock();
      mouseGrass();
      mousePaw();
    }
    if (!miceFreeze) {
      auroraMice();
    };

    if (!catFreeze) {
      mouseCat();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseMoving]);

  useEffect(() => {
    console.log("rockslocation === 0")
    setupRocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rockLocations === 0]);


  useEffect(() => {
    if (rockLocations !== 0) {
      setupGrass();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rockLocations]);

  useEffect(() => {
    setupRocks()
  }, [score.level])

  return (
    <main  >
      <div id="board" className="board" onDoubleClick={handleMouseBomb} onClick={handleMouseClick} onMouseMove={findCoords}>


        <div id="message" className="message-div hidden">
          <p id="messageText"> </p>
        </div>

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
          <>
            <Paws key={index} location={paw} />
            <span id={paw.paw + "found"} className="fadeout paw-message" style={{ left: paw.left, top: paw.top }}> !!!MOUSE BOMB!!!</span>
          </>
        ))}

        {miceLocations.map((mice, index) => (
          <Mice key={index} location={mice} />
        ))}



      </div>

      <Score score={score} mouseBombCount={mouseBomb} mouseBomb={handleMouseBomb} />
    </main>
  )
}

export default Board