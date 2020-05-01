import React, { useState, useEffect } from 'react';

import { RocksQuery } from '../js/rocksQuery';
import { GrassQuery } from '../js/grassQuery';
import { CatQuery } from '../js/catQuery';
import { MouseQuery } from '../js/mouseQuery';

import Mouse from './character/Mouse';
import Hole from './character/Hole';
import Rock from './character/Rock';
import Grass from './character/Grass';
import Aurora from './character/Aurora';

function Board(props) {

  const [boardLeft, setBoardLeft] = useState(null);
  const [boardTop, setBoardTop] = useState(null);

  const [mouseFreeze, setMouseFreeze] = useState(false);
  const [mouse, setMouse] = useState({ left: 25, top: 25, bottom: 100, right: 100 })
  const [mouseMoving, setMouseMoving] = useState(0);
  // const [mouseTop, setMouseTop] = useState(25);
  // const [mouseLeft, setMouseLeft] = useState(25);

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
      const newMouse = MouseQuery.overMouse(xpos, ypos, mouse);
      if (newMouse !== false){
        setMouse(newMouse);
        const move = (mouseMoving === 1) ? 0 : 1;
        setMouseMoving(move);
      }
    }
  }

  function mouseHole() {
    const result = MouseQuery.mouseHole(mouse, hole)
    if (result === true) {
      setMouseFreeze(true);
      mouseCaught("Wandering Mouse wandered home!!!");
    }
  }

  function resetMouse() {
    setTimeout(() => {
      setMouse({ left: 25, right: 100, top: 25, bottom: 100 });
      setRocksLocations([]);
      setGrassLocations([]);
      setMouseFreeze(false);
      setCatFreeze(true)
      document.querySelector("#message").classList.toggle("show")
      document.querySelector("#mouse").classList.toggle("fadein");
      document.querySelector("#mouse").classList.toggle("fadeout");
      document.querySelector("#aurora").classList.add("fadeout");
    }, 3000);
  }

  function mouseCaught(message) {
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
    setupGrass();
  };


  function mouseRock() {
    const result = RocksQuery.overRock(mouse, rockLocations);
    const cat = (result) ? RocksQuery.catInRock() : false;
    if (cat === true) {
      mouseCaught(`Mouse caught by Hudson the Rock Hidding Kitten`);
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
    const result = GrassQuery.overGrass(mouse, grassLocations);
    const Newcat = (result) ? activeCat() : '';
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

  function mouseCat() {
    const result = CatQuery.overCat(mouse, cat);
    const message = "Aurora leaps out from the grass tuff and caughts the Wandering Mouse "
    const Catmove = result ? mouseCaught(message) : CatQuery.move(mouse, cat)
  }

  useEffect(() => {
    setBoardCoors();
  }, [boardLeft === null]);

  useEffect(() => {
    console.log("mouse")
    if (!mouseFreeze) {
      mouseHole();
      mouseRock();
      mouseGrass();
    }
    if (!catFreeze) {
      mouseCat();
    }
  }, [mouse]);

  useEffect(() => {
    setupRocks();
  }, [rockLocations.length === 0]);
  useEffect(() => {
    setupGrass()
  }, [grassLocations.length === 0])

  return (
    <main id="board" className="board" onMouseMove={findCoords} >
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

      <div id="message" className="message-div hidden">
        <p id="messageText"> </p>
      </div>
    </main>
  )
}

export default Board