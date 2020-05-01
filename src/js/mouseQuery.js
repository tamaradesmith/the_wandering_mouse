const MouseQuery = {
  overMouse(xpos, ypos, mouse) {
    let Mmove = false;
    const newMouse = mouse;
    if (xpos > mouse.left && xpos < mouse.right) {
      if (ypos > mouse.top && ypos < mouse.bottom) {
        const left = xpos - mouse.left;
        const top = ypos - mouse.top;
        if (left < 25) {
          newMouse.left = mouse.left + Math.ceil(Math.random() * 10);
          Mmove = true;
        } else if (left > 55) {
          newMouse.left = mouse.left - Math.ceil(Math.random() * 10);
          Mmove = true;
        }
        if (top < 25) {
          newMouse.top = mouse.top + Math.ceil(Math.random() * 10);
          Mmove = true;
        } else if (top > 55) {
          newMouse.top = mouse.top - Math.ceil(Math.random() * 10);
          Mmove = true;
        }
      }
    }
    if (newMouse.left < 0) {
      mouse.left = 0 + 5;
    }
    if (newMouse.left + 75 > 1200) {
      newMouse.left = 1200 - 80;
    }
    if (newMouse.top < 0) {
      newMouse.top = 0 + 5;
    }
    if (newMouse.top + 75 > 800) {
      newMouse.top = 800 - 80;
    }
    if (Mmove === true) {
      newMouse.right = newMouse.left + 75;
      newMouse.bottom = newMouse.top + 75;
      return newMouse;
    } else {
      return false
    }
  },
  mouseHole(mouse, hole) {
    let result = false;
    if (mouse.left + 75 > hole.left && mouse.left < hole.right) {
      if (mouse.top < hole.bottom && mouse.bottom > hole.top) {
        result = true;
      }
    }
    return result
  }
};

export { MouseQuery };